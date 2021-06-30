// *********** s : 탭메뉴 클릭이벤트 공통 ***********
tabMenu = document.getElementsByClassName("tabMenu");
if(tabMenu.length > 0){
    [].forEach.call(tabMenu, function(ul) {
        tabList = ul.getElementsByTagName("li");
        [].forEach.call(tabList, function(li) {
            li.addEventListener('click', function() {
                [].forEach.call(tabList, function(all){
                    all.classList.remove("on") //전체 li on클래스 해제
                })
                this.classList.add("on") //클릭된 li on 클래스 추가
            });
        });
    });
}
// *********** e : 탭메뉴 클릭이벤트 공통 ***********

// *********** s : 제품 카테고리 버튼시 좌우 크롤이벤트 ***********
// s : 변수선언
const navWrap = document.getElementsByClassName("contents_top_nav")[0],
      cateNav = document.getElementsByClassName("nav_categories")[0],
      btnPrev = document.getElementsByClassName("btn_categories_prev")[0],
      btnNext = document.getElementsByClassName("btn_categories_next")[0];
// e : 변수선언
function ctgrScroll(btn){
    scrollValue = Math.floor(cateNav.getElementsByTagName("li")[0].clientWidth);
    scrollValue = btn == 0 ? -1 * scrollValue : scrollValue;
    cateNav.scrollBy(scrollValue, 0);
}

function scrollEndCheck(){
    navWrap.classList.remove("leftEnd");
    navWrap.classList.remove("rightEnd");
    if(cateNav.scrollLeft == 0){
        navWrap.classList.add("leftEnd");
    }//스크롤이 왼쪽 끝에 닿을 때
    else if(cateNav.scrollLeft + cateNav.clientWidth == cateNav.scrollWidth){
        navWrap.classList.add("rightEnd")
    }//스크롤이 오른쪽 끝에 닿을 때
}
scrollEndCheck();
cateNav.addEventListener("scroll",function(){
    scrollEndCheck();
})
// *********** e : 제품 카테고리 버튼시 좌우 스크롤이벤트 ***********

// *********** s : 팝업 슬라이더 ***********
// s : 변수선언
const layer = document.getElementsByClassName("wrapper_popup_layer")[0],
      slider = document.getElementsByClassName("popup_layer_contents")[0],
      handler = document.getElementsByClassName("slide_handler")[0],
      btnLayerPrev = document.getElementsByClassName("btn_layer_prev")[0],
      btnLayerNext = document.getElementsByClassName("btn_layer_next")[0],
      reactValue = 99;
var pagination = 0,
    pages = handler.getElementsByClassName("layer_page");
// e : 변수선언

// s : 드래그 값 받기
slider.addEventListener("touchstart",function(e){
    startX = e.changedTouches[0].clientX;
})
slider.addEventListener("touchend",function(e){
    endX = e.changedTouches[0].clientX;
    moveX = parseInt(startX - endX);
    doSlide(moveX);
})
slider.addEventListener("mousedown",function(e){
    pcStartX = e.pageX
})
slider.addEventListener("mouseup",function(e){
    pcEndX = e.pageX
    pcMoveX = parseInt(pcStartX - pcEndX);
    doSlide(pcMoveX);
})
// e : 드래그 값 받기

function doSlide(drag){
    // s : next
    if(drag > reactValue){
        pagination = pagination < pages.length - 1 ? pagination + 1 : pagination
    }
    // e : next
    // s : prev
    else if(drag < -1 * reactValue){
        pagination = pagination > 0 ? pagination - 1 : pagination
    }
    // e : prev

    // s : 레이어 클래스리스트 초기화
    layer.classList.remove("rightEnd");
    layer.classList.remove("leftEnd");
    // e : 레이어 클래스리스트 초기화

    // s : 레이어가 처음이나 끝일 때
    if(pagination == pages.length - 1){
        layer.classList.add("rightEnd")
    }
    else if(pagination == 0){
        layer.classList.add("leftEnd")
    }
    // e : 레이어가 처음이나 끝일 때
    
    handler.style.left = pagination * -100 + "%"
}
doSlide();
// *********** e : 팝업 슬라이더 ***********

// *********** s : 팝업 호출 및 닫기 ***********
searchBar = document.getElementsByClassName("popup_search_bar")[0];
// s : 호출
function layerCall(type){
    if(type == 0){ //제품 상세
        slider.classList.add("on")
        // s : 페이지가 한장일 때 prev, next 버튼 삭제
        if(pages.length > 1){
            layer.classList.add("multi")
        }
        else{
            layer.classList.remove("multi")
        }
        // e : 페이지가 한장일 때 prev, next 버튼 삭제
    }
    else if(type == 1){//검색
        searchBar.classList.add("on");
    }

    layer.classList.add("on");
}
// e : 호출
// s : 닫기
function layerClose(node){
    node.parentNode.classList.remove("on");
    slider.classList.remove("on")
    searchBar.classList.remove("on");
    layer.classList.remove("multi")
}
// e : 닫기
// *********** e : 팝업 호출 및 닫기 ***********

// *********** s : On/Off 트리거 ***********
function onOffTrigger(e,obj){
    e.stopPropagation();
    state = hasClass(obj, 'on') == true ? true : false
    if(state){
        obj.classList.remove("on");
    }
    else{
        obj.classList.add("on");
    }
}
// *********** e : On/Off 트리거 ***********
compareButtons = document.getElementsByClassName("wrapper_compare_buttons")[0];
btnGoCompare = document.querySelectorAll(".btn_go_compare span")[0];
function compareCheck(){
    compareChecked = document.querySelectorAll(".icon_state_compare.on");
    if(compareChecked.length > 0){
        compareButtons.classList.add("on")
        btnGoCompare.innerHTML = compareChecked.length;
    }
    else{
        compareButtons.classList.remove("on")
    }
}


// *********** s : hasClass Function ***********
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}
// *********** e : hasClass Function ***********

// *********** s : 즐겨찾기 체크박스 클릭시 부모이벤트 실행 막기 ***********
function checkFavList(e){
    e.stopPropagation();
}
// *********** e : 즐겨찾기 체크박스 클릭시 부모이벤트 실행 막기 ***********

// *********** s : 전체화면 트리거 ***********
body = document.getElementsByTagName("body")[0];
navTrigger = document.getElementById("navTrigger");
function fullScreen(cbx){
    if(cbx.checked == true){
        body.classList.add("navoff")
    }
    else{
        body.classList.remove("navoff")
    }
}
// *********** e : 전체화면 트리거 ***********
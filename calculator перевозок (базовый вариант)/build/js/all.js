
let tent = document.querySelector('.tent'),
    bort = document.querySelector('.bort'),
    buttons = document.querySelectorAll('.type li button'),
    termo = document.querySelector('.termo'),
    refr = document.querySelector('.refr'),
    furgon = document.querySelector('.furgon'),
    tral = document.querySelector('.tral'),
    contVoz = document.querySelector('.cont-voz'),
    type = document.querySelectorAll('.print__type__type ul'),
    firstVar = document.querySelectorAll('.firstVar'),
    twoVar = document.querySelectorAll('.twoVar'),
    threeVar = document.querySelectorAll('.threeVar'),
    fourVar = document.querySelectorAll('.fourVar'),
    allVar = document.querySelectorAll('.type__example li'),
    out = document.querySelector('.out'),
    toGo = document.querySelector('.to-go'),
    btn = document.querySelector('.btn__enter'),
    addNew = document.querySelector('.add-new'),
    idInput = 0,
    clicks = 0,
    enter = document.querySelector('.enter'),
    priceForKill = 0,
    countdown = document.querySelector('.countDown'),
    popup = document.querySelector('.popup'),
    closePopup = document.querySelector('.close-popup'),
    typeCar = 'Тент';

document.querySelector('.map-container__right').addEventListener('click', function (e) {
    let parent = e.target.parentNode.parentNode.parentNode;
    if (e.target.classList.contains('btn-request-email')) {
        sendRequest();
    }
}); 

function sendRequest() {
    if (isValid('.name') == true && isValid('.tel') == true && isValidPhone('.tel') == true) {
       document.querySelector('.summ').remove();
       popup.classList.add('display-block');
       countDown();
    }    
}

function countDown() {
    let target_date = (new Date().getTime()) + 5*1000; 
    getCountdown();
    setInterval(function () { getCountdown(); }, 1000);
    function getCountdown(){
        let current_date = new Date().getTime(),
            seconds = Math.ceil((target_date - current_date) / 1000);
        countdown.textContent = seconds; 
    }
    setInterval(function() {closePopup(); }, 5000);
    function closePopup() {
        popup.classList.remove('display-block');
    }
    return
}

closePopup.onclick = function () {
    popup.classList.remove('display-block');
}

const isValidPhone = (props) => {
    let el = document.querySelector(props),
        re = /^\d[\d\(\)\ -]{4,14}\d$/;
    if (re.test(el.value) == false) {
        el.classList.add('error');
        el.classList.remove('success');
        return false;
    } else {
        el.classList.remove('error');
        el.classList.add('success')
        return true;
    }
}  

type[0].classList.add('display-block');
buttons[0].classList.add('color-blue');

tent.addEventListener('click', () => {
    clearBlock();
    displayBlock(type[0]);
    clearColor();
    colorBlue(tent);
    typeCar = 'Тент';
}); 

bort.addEventListener('click', () => {
    clearBlock();
    displayBlock(type[1]);
    clearColor();
    colorBlue(bort);
    typeCar = 'Борт';
});   

termo.addEventListener('click', () => {
    clearBlock();
    displayBlock(type[2]);
    clearColor();
    colorBlue(termo);
    typeCar = 'Термоконтейнер';
}); 


refr.addEventListener('click', () => {
    clearBlock();
    displayBlock(type[3]);
    clearColor();
    colorBlue(refr);
    typeCar = 'Рефрежиратор';
}); 

furgon.addEventListener('click', () => {
    clearBlock();
    displayBlock(type[4]);
    clearColor();
    colorBlue(furgon);
    typeCar = 'Фургон';
});   

tral.addEventListener('click', () => {
    clearBlock();
    displayBlock(type[5]);
    clearColor();
    colorBlue(tral);
    typeCar = 'Трайл';
}); 

contVoz.addEventListener('click', () => {
    clearBlock();
    displayBlock(type[6]);
    clearColor();
    colorBlue(contVoz);
    typeCar = 'Контейневоз';
});     

firstVar.forEach(el => {
    el.addEventListener('click', () => {
        clearColorGray();
        colorGray(firstVar);
        priceForKill = 14;
    });
});


twoVar.forEach(el => {
    el.addEventListener('click', () => {
        clearColorGray();
        colorGray(twoVar);
        priceForKill = 18;
    });
});


threeVar.forEach(el => {
    el.addEventListener('click', () => {
        clearColorGray();
        colorGray(threeVar);
        priceForKill = 16;
    });
});


fourVar.forEach(el => {
    el.addEventListener('click', () => {
        clearColorGray();
        colorGray(fourVar);
        priceForKill = 20;
    });
});  

ymaps.ready(init);

function init(){     
    myMap = new ymaps.Map ("map", {
        center: [55.76, 37.64],
        zoom: 7
    }); 
}


function routeAll() {
    let outValue = out.value,
        toGoValue = toGo.value;

    if (document.querySelector('.summ')) {
        document.querySelector('.summ').remove();
    }
    
    if (document.querySelector('.new-input1') && document.querySelector('.new-input1').value) {
        ymaps.route([
            outValue,
            { type: 'viaPoint', point: document.querySelector('.new-input1').value},
            toGoValue,
        ], {
            mapStateAutoApply: true
        }).then(function (route) {
            route.getPaths().options.set({
                balloonContentBodyLayout: ymaps.templateLayoutFactory.createClass('$[properties.humanJamsTime]'),
                strokeColor: '0000ffff',
                opacity: 0.9
            });
            calculator(Math.floor(route.getLength()/1000));
            myMap.geoObjects.add(route);
        });
    }  else {
        ymaps.route([
            outValue,
            toGoValue,
        ], {
            mapStateAutoApply: true
        }).then(function (route) {
            route.getPaths().options.set({
                balloonContentBodyLayout: ymaps.templateLayoutFactory.createClass('$[properties.humanJamsTime]'),
                strokeColor: '0000ffff',
                opacity: 0.9
            });
            calculator(Math.floor(route.getLength()/1000));
            myMap.geoObjects.add(route);
        });
    }
  
    out.value ='';
    toGo.value = '';
    
   
    function calculator(lengthRoute) {
        let end;
        if (lengthRoute*priceForKill < 499) {
            endSumm = '499';
            priceForKill = 'Минимальный заказ 499';
        } else {
            endSumm = lengthRoute*priceForKill;
        };
        renderSumm(lengthRoute, priceForKill, outValue, toGoValue, typeCar, endSumm);
    } 
}


function renderSumm(lengthRoute, priceForKill, outValue, toGoValue, typeCar, endSumm) {
    
    document.querySelector('#map').insertAdjacentHTML('beforebegin', 
        `<div class="summ">
            <h1>Итог:</h1>
            <ul class="summ1">
                <li><span>Направление: </span><span>${outValue}-${toGoValue}</span></li>
                <li><span>Расстояние: </span><span>${lengthRoute}км</span></li>
                <li><span>Тип машины: </span><span>${typeCar}</span></li>
                <li><span>Стоимость за км: </span><span>${priceForKill} руб</span></li>
                <li><span>Итоговая цена: </span><span>${endSumm} руб.</span></li>
                <li class="li-btn-request">
                    <button class="btn-request">
                        <span class="btn-request">Отправить запрос</span>
                    </button>
                </li>    
            </ul>
        </div>`  
    );  
};

document.querySelector('.map-container__right').addEventListener('click', function (e) {
    let parent = e.target.parentNode.parentNode;        
    if (e.target.classList.contains('btn-request')) {
        document.querySelector('.li-btn-request').remove();
        document.querySelector('.summ1').insertAdjacentHTML('beforeend', 
        `<li>
            <input type="text" class="name" placeholder="Ваше Имя">
        </li>
        <li>
            <p>Обязательно в формате только цифры!!!</p>
        </li>
        <li>    
            <input type="tel" class="tel" placeholder="Ваш телефон">
        </li>
        <li>
            <button class="btn-request-email">
                <span class="btn-request-email">Отправить запрос</span>
            </button>
        </li>`);
    }
});


addNew.addEventListener('click', () => {
    if (clicks === 0) {
        renderInput();
        clicks +=1;
    }
});

function renderInput() {
    toGo.insertAdjacentHTML('beforebegin', 
        `<li class="new-input-li">
        <button class="btn-close">
            <span class="btn-close"></span>
            <span class="btn-close"></span>
        </button>
        <input type="text" placeholder="Промежуточный пункт" class="new-input1">
        </li>`  
    );
};

enter.addEventListener('click', function (e) {
    let parent = e.target.parentNode.parentNode;
    if (e.target.classList.contains('btn-close')) {
        parent.remove();
        clicks = 0;
    }
});
  

btn.addEventListener('click', () => {   
    if (isValid('.out') == true && isValid('.to-go') == true && isValidPrice(priceForKill) == true) {
        routeAll();
    }  
});


function isValidPrice (prop) {
    if (prop == 0) {
        allVar.forEach(el => {
            el.classList.add('error-body');
        });
        document.querySelector('.label-for-types').classList.add('display-block');
        return false;
    } else {
        allVar.forEach(el => {
            el.classList.remove('error-body');
        });
        document.querySelector('.label-for-types').classList.remove('display-block');
        return true;
    }
};


function isValid (prop) {
    let el = document.querySelector(prop);
    if (el.value.length < 2) {
        el.classList.remove('success')
        el.classList.add('error');
        if (prop == '.out' || prop == '.to-go') {
            document.querySelector('.label-for-out').classList.add('display-block');
            document.querySelector('.label-for-toGo').classList.add('display-block');
        }
      
        return false;
    } else {
        el.classList.remove('error');
        el.classList.add('success');
        if (prop == '.out' || prop == '.to-go') {
            document.querySelector('.label-for-out').classList.remove('display-block');
            document.querySelector('.label-for-toGo').classList.remove('display-block');
        }
        return true;
    }
}

function clearColorGray() {
    allVar.forEach(el => {
        el.classList.remove('color-gray');
    });
}

function colorGray (prop) {
    prop.forEach(el => {
        el.classList.add('color-gray');
    });
};

function clearBlock () {
    type.forEach(el => {
        el.classList.remove('display-block');
    });
}
function displayBlock (prop) {
    prop.classList.add('display-block');
}  


function clearColor () {
    buttons.forEach(el => {
        el.classList.remove('color-blue');
    });
}

function colorBlue (prop) {
    prop.classList.add('color-blue');
}

document.querySelector('.about__point').onmouseover = function () {
    if (document.querySelector('.new-input1')) {
        document.querySelector('.about__point2').classList.add('display-block');
    } 
}

document.querySelector('.about__point').onmouseout  = function () {
    document.querySelector('.about__point2').classList.remove('display-block');
}
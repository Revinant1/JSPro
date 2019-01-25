// public, protected, private

function Container(id, className, tagName) {
    // public
    this.id = id;
    this.className = className;

    // protected
    this._tagName = tagName;

    // private
    var element;

    this.getElement = function() {
        return element;
    }

    this.setElement = function(newValue) {
        element = newValue;
    }
}

Container.prototype.render = function() {
    var element = this.getElement();

    if (!element) {
        element = document.createElement(this._tagName);
        element.id = this.id;
        element.className = this.className;

        this.setElement(element);
    }

    return element;
}

Container.prototype.remove = function() {
    var element = this.getElement();

    if(element) {
        element.parentElement.removeChild(element);
        this.setElement(null);
    }
}

function Menu(id, className, items) {
    Container.call(this, id, className, 'dul');

    // protected
    this._items = items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.render = function() {
    var container = Container.prototype.render.call(this);

    this._items.forEach(function(item) {
        if(item instanceof Container) {
            container.appendChild(item.render());
        }
    });

    return container;
}


function MenuItem4(className, link, title) {
    Container.call(this, '', className, "ul");


    this.link = link;
    this.title = title;

}
function MenuItem3(className, link, title) {
    Container.call(this, '', className, "ul");


    this.link = link;
    this.title = title;

}
function MenuItem2(className, link, title) {
    Container.call(this, '', className, "ul");


    this.link = link;
    this.title = title;

}
function MenuItem1(className, link, title) {
    Container.call(this, '', className, "ul");


    this.link = link;
    this.title = title;

}
function MenuItem(className, link, title) {
    Container.call(this, '', className, "ul");


    this.link = link;
    this.title = title;

}


MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.render = function() {

    var container = Container.prototype.render.call(this);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8080/json/women.json");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var menuName = JSON.parse(xhr.responseText);

            menuName.forEach(function (punkt) {
                var div = document.createElement("div");
                var li = document.createElement("li");
                var  a = document.createElement("a");
                a.textContent = punkt.punktTitle;
                a.href = punkt.link;
                console.log(a.textContent);
                li.appendChild(a);
                container.appendChild(li);
            })

        }

    }
    return container;
}
MenuItem1.prototype = Object.create(Container.prototype);
MenuItem1.prototype.render = function() {

    var container = Container.prototype.render.call(this);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8080/json/accessories.json");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var menuName = JSON.parse(xhr.responseText);

            menuName.forEach(function (punkt) {
                var li = document.createElement("li");
                var  a = document.createElement("a");
                a.textContent = punkt.punktTitle;
                a.href = punkt.link;
                console.log(a.textContent);
                li.appendChild(a);
                container.appendChild(li);
            })

        }

    };
    return container;
};


function SuperMenu(id, className, items, link, title) {
    MenuItem4.call(this, 'item', link, title);
    MenuItem3.call(this, 'item', link, title);
    MenuItem2.call(this, 'item', link, title);
    MenuItem1.call(this, 'item', link, title);
    MenuItem.call(this, 'item', link, title);
    Menu.call(this, id, className, items);

}

SuperMenu.prototype = Object.create(Menu.prototype);
SuperMenu.prototype.render = function() {
    if(this.link && this.title) {
        var Item4 = new MenuItem4('item', this.link, this.title).render();
        var Item3 = new MenuItem3('item', this.link, this.title).render();
        var Item2 = new MenuItem2('item', this.link, this.title).render();
        var Item1 = new MenuItem1('item', this.link, this.title).render();
        var Item = new MenuItem('item', this.link, this.title).render();
        var menu = Menu.prototype.render.call(this);
        Item1.appendChild(menu);
        Item.appendChild(menu);


        return Item , Item1;
    }else{
        return Menu.prototype.render.call(this);
    }
}


var menuItem1 = new MenuItem('menu-item', '/', '');
var menu1 = new SuperMenu('menu1', 'menu', [menuItem1]);

var menuItem2 = new MenuItem1('menu-item', '/', '');
var menu2 = new SuperMenu('menu1', 'menu', [menuItem2]);


var $menuSub = document.getElementById("wrap_menu");
$menuSub.appendChild(menu1.render());
$menuSub.appendChild(menu2.render());




var xhr = new XMLHttpRequest();
xhr.open("GET", "http://127.0.0.1:8080/../json/galeri.json");
xhr.send();
xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        var imageName = JSON.parse(xhr.responseText);

        var div = document.createElement("div");
        div.className = "galeri";
        imageName.forEach(function (name) {
            var span = document.createElement("span");
            span.className = name.name;
            span.textContent = name.name;
            var img = document.createElement("img");
            img.src = name.miniature;
            img.className = "miniature";
            img.addEventListener("click", handleOpenModal);
            var modalImg = document.createElement("img");
            modalImg.src = name.fulldrawing;
            modalImg.className = "fulldrawing";
            modalImg.addEventListener("click", handleClostModal);


            div.appendChild(span);
            div.appendChild(img);
            div.appendChild(modalImg);


            function handleOpenModal(event) {
                modalImg.style.display = "flex";
                event.stopImmediatePropagation();

            }
            function handleClostModal(event) {
                modalImg.style.display = "none";
                event.stopImmediatePropagation();
            }

        });


        document.body.appendChild(div);

    }


}

var button = document.getElementById("success");
button = addEventListener("click",handleGetGaleri);
function handleGetGaleri() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8080/json/success.json");
    xhr.send();
    xhr.onreadystatechange = function () {
            var response = JSON.parse('{"result":"success"}',function (key,vual) {
                var a = document.getElementById("success");
                if (vual.result === "success") {
                    a.innerHTML = "Успех";
                    a.style.backgroundColor = "green";
                } else {
                    a.innerHTML = "Ошибка";
                    a.style.backgroundColor = "red";
                }
                return vual;
            });


        }
    event.stopImmediatePropagation();
}



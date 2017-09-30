(function () {//Зачем этот импорт и экспорт?
    //Как делать шаблонные функции на клиенте?
    //import
    var Form = window.form,
        Chat = window.chat,
        User = window.User;
      
    class App{
        constructor(options) {
            window.LastId = null;
            this.el = options.el;
            this._initElements();
            this.el.appendChild(this.chat.el);
            this.el.appendChild(this.form.el);
            this.user = new User(options.user);
            this._initEvents();
            
           
        }

        _initElements() {
            this.form = new Form({ el: document.createElement('div') });
            this.chat = new Chat({ el: document.createElement('div') });

        }

        sendMessage(e) {
            var message = e.detail;
            var obj = {
                text: message.value,
                photo: this.user.photo,
                name:this.user.name
            }
            this.chat.addMessage(obj);
           
        }

        _initEvents() {
            this.form.el.addEventListener('otpravleno', this.sendMessage.bind(this));

        }



    }
    //export
    window.App = App;


})();
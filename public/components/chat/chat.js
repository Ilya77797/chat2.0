(function () {
    //import
    const tmpl = window.templateFunctionChatRender;
    const tmplGenerate = window.templateFunctionChatGenerateMessages;
    const ServerAddr = 'https://chat-1adbe.firebaseio.com/chat/messages.json';
    var El = null;
    var NotificationDiv = window.NotificationDiv;

    class chat {
        constructor(options) {
            El = this;
            this.data = [];
            this.el = options.el;
            this._initEvents();
            this._getDataFirtTime();
            this.render();
            
        }

        addMessage(message) {
            if (message.text == '') return;
            this.data.push({
                text:message.text,
                photo:message.photo ,
                name:message.name
            });
            this._sendDataToServer();
            this.data.pop();
            


        }

        _initEvents() {
            this.el.addEventListener('Prineto', this.render.bind(this));
            NotificationDiv.addEventListener('click', this._ScroolToBottom);
            
        }

        generateMessages() {
            if (this.data.length == 0)
                return '<h2>Сообщений нет!</h2>'
            else
                return this.data.map(item=> {
                    return tmplGenerate({ITEM:item , Identety: this._UserIdentety(item) });
                                   }).join('');
           
        }

        render() {
            this.el.innerHTML = tmpl({ func: this.generateMessages.bind(El) });
            
            
        }

        _getDataFirtTime(){
            var xhr = new XMLHttpRequest();
            xhr.open('Get', "/first", true);
            xhr.send();

            xhr.onreadystatechange = function () {
                if (xhr.readyState != 4) return;
                var massData = JSON.parse(xhr.responseText);
                massData.forEach((data)=>{
                    El.data.push(data);
                });

                var event = new CustomEvent('Prineto');
                El.el.dispatchEvent(event);
                El._ScroolToBottom();
                El._getDataFromServer();



            }
        }

        _getDataFromServer() {
            var xhr = new XMLHttpRequest();
            xhr.open('Get', "/subscribe?r="+ Math.random(), true);
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState != 4) return;
                try{
                    var ObjDataServer = JSON.parse(xhr.responseText);
                    El.data.push(ObjDataServer);
                    var event = new CustomEvent('Prineto');
                    El.el.dispatchEvent(event);
                    if(ObjDataServer.name!=window.nameUser_identety)
                        El._NoteInit();
                    El._ScroolToBottom();
                    El._getDataFromServer();
                }
                catch(e){
                    console.log('Ошибка: ',e)
                    setTimeout(El._getDataFromServer, 20000);
                }

            }
        
        }

        _sendDataToServer() {
            var xhr = new XMLHttpRequest();
            var json=JSON.stringify({
                  version:'1.0',
                  data:this.data[this.data.length-1]
            });
            xhr.open("POST","/publish", true);
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xhr.send(json);
            
        
        }

        _UserIdentety(item) {
            if (item.name == window.nameUser_identety)
                return 'left';
            return 'right';
        }

        _ScroolToBottom() {
            var messDivs = document.querySelectorAll('div.message-box');
            var destin = messDivs[messDivs.length - 1];
            try {
                destin.scrollIntoView(false);
            } catch (e) {

            }

            try {
                El.el.removeChild(NotificationDiv);
            } catch (e) {

            }
            
           


        }

        _StartCometConection(ObjDataServer) {

            if (window.LastId == null) {

                if (ObjDataServer == null)
                    ObjDataServer = { data: [] };
                else {

                    for (var key in ObjDataServer) {
                        El.data.push(ObjDataServer[key].data);
                        window.LastId = key;
                    }

                }
                var event = new CustomEvent('Prineto', { detail: ObjDataServer.data });
                El.el.dispatchEvent(event);
            }
            else {
                var id = null;
                for (var key in ObjDataServer)
                    id = key;

                if (id != window.LastId) {
                    var flag = false;
                    for (var key in ObjDataServer) {
                        if (flag)
                            El.data.push(ObjDataServer[key].data);
                        if (key == window.LastId)
                            flag = true;
                    }

                    var event = new CustomEvent('Prineto', { detail: ObjDataServer.data });
                    El.el.dispatchEvent(event);
                    if (ObjDataServer[id].data.name != window.nameUser_identety)
                        El._NoteInit();
                    else
                        El._ScroolToBottom();
                       
                      
                }
                window.LastId = id;
            }

            El._getDataFromServer();
           
        }

        _NoteInit() {
            El.el.appendChild(NotificationDiv);

        }

    }


    //export
    window.chat = chat;





})();

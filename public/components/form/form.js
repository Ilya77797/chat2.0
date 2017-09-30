(function () {

    class form {
        constructor(options) {
            this.el = options.el;
            this._createInterface();
            this._addEvents();

        }

        _createInterface() {
            this.el.innerHTML = `
           <form>
		    <textarea name="message" type="text"></textarea>
			<input type="submit" value="Отправить" />
		  </form>
            `;
        }

     

        _submit(e) {
            var type = e.target.getAttribute('type');
            if (type == "submit" || e.keyCode==13) {
                e.preventDefault(); 
                var message = e.target.parentElement.getElementsByTagName('textarea')[0];
                var event = new CustomEvent('otpravleno', { detail: message });
                this.el.dispatchEvent(event);
                message.value = '';
            }
              
        }

        _addEvents() {
            this.el.addEventListener('click', this._submit.bind(this));
            this.el.addEventListener('keydown', this._submit.bind(this));
        }

      


    }

    //export
    window.form = form;


})();
(function () {
   
    var tempRenderTxt = `
         <div class ="chat">
                  <div class ="chat__container">
                    <div class ="header">
                      <h2> Чат </h2>
                      <div class ="chat__box">
                      <%=func()%>
                                            
                      </div>
                    </div>

                  </div>

          </div>
        `;


    var tempGenerateMessageTxt = `
       <div class ="message-box <%=Identety%>-img ">
                            <div class ="picture">
                              <img src=" <%=ITEM.photo%>"  />
                            </div>

                            <div class ="message">
                              <span><%=ITEM.name%></span>
                              <p><%=ITEM.text%></p>
                            </div>


        </div>

        `;

    var templateFunctionRender = window._.template(tempRenderTxt);
    var templateFunctionGenerateMessages = window._.template(tempGenerateMessageTxt);
    //export
    window.templateFunctionChatRender = templateFunctionRender;
    window.templateFunctionChatGenerateMessages = templateFunctionGenerateMessages;
})();
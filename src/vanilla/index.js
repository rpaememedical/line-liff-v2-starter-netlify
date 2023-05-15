import './index.css';
import liff from '@line/liff'

function submitForm(message, agree) {
    const line_id = document.getElementById("line_id").value
    const line_name = document.getElementById("line_name").value
    const real_name = document.getElementById("real_name").value
    const confrim_message = message
    // 彈出確認框
    const confirmation = confirm(message);
    const chat_text = `/服務條款表單\nLINE後台ID: ${line_id}\nLINE名稱: ${line_name}\n病友的全名: ${real_name}\n同意/不同意條款: ${agree}`
    
    // 如果使用者確認，則提交表單
    if (confirmation == true) {
        liff.sendMessages([{ type: 'text', text: chat_text }])
        .then(() => {
            console.log('message sent')
            liff.closeWindow()
        })
        .catch((err) => {
            console.log('error', err)
            liff.closeWindow()
        })
    }
}

document.addEventListener("DOMContentLoaded", function() {
  liff
    .init({ liffId: process.env.LIFF_ID })
    .then(() => {
        console.log("Success! you can do something with LIFF API here.")
        if(!liff.isInClient()) {
            alert("請使用手機 LINE app 操作")
            return
        }
        if(!liff.isLoggedIn()) {
            liff.login()
        } else {
            console.log("Already logged in.")
            // send message back to line when click submit button
            const submit = document.getElementById("submit")
            submit.addEventListener("click", function() {
                const real_name = document.getElementById("real_name").value
                if(real_name == "") { return alert("病友的全名不可為空白") }
                submitForm(`確定「病友的全名」為「${real_name}」？`, true)
            })

            const reset = document.getElementById("reset")
            reset.addEventListener("click", function() {
                submitForm("確定「不同意」服務條款？", false)
            })


            const profile = liff.getDecodedIDToken()

            const real_name = document.getElementById("real_name")
            const real_name_col = document.getElementById("real_name_col")
            real_name_col.attributes.removeNamedItem("hidden")

            const line_id = document.getElementById("line_id")
            line_id.setAttribute("value", profile.sub)

            const line_name = document.getElementById("line_name")
            line_name.setAttribute("value", profile.name)
            const line_name_col = document.getElementById("line_name_col")
            line_name_col.attributes.removeNamedItem("hidden")
        }

        
    })
    .catch((error) => {
        console.log(error)
    })
});

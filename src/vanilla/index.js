import './index.css';
import liff from '@line/liff'

document.addEventListener("DOMContentLoaded", function() {
  liff
    .init({ liffId: process.env.LIFF_ID })
    .then(() => {
        console.log("Success! you can do something with LIFF API here.")
        if(!liff.isInClient()) {
            alert("請使用手機 LINE app 操作")
            liff.closeWindow()
        }
        if(!liff.isLoggedIn()) {
            liff.login()
        } else {
            console.log("Already logged in.")
            // send message back to line when click submit button
            const submit = document.getElementById("submit")
            submit.addEventListener("click", function() {
                const line_id = document.getElementById("line_id").value
                const line_name = document.getElementById("line_name").value
                const email = document.getElementById("email").value
                const real_name = document.getElementById("real_name").value
                const agree = document.getElementById("agree").checked
                const message = `/submit_privacy_form\nID: ${line_id}\nLINE: ${line_name}\nEmail: ${email}\n姓名: ${real_name}\n同意: ${agree}`
                liff.sendMessages([{ type: 'text', text: message }])
                .then(() => {
                    console.log('message sent')
                    liff.closeWindow()
                })
                .catch((err) => {
                    console.log('error', err)
                    liff.closeWindow()
                })
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

            const email = document.getElementById("email")
            email.setAttribute("value", profile.email)
            const email_col = document.getElementById("email_col")
            email_col.attributes.removeNamedItem("hidden")
        }

        
    })
    .catch((error) => {
        console.log(error)
    })
});

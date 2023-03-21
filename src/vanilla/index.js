import './index.css';
import liff from '@line/liff'

document.addEventListener("DOMContentLoaded", function() {
  liff
    .init({ liffId: process.env.LIFF_ID })
    .then(() => {
        console.log("Success! you can do something with LIFF API here.")
        if(!liff.isLoggedIn()) {
            liff.login()
        } else {
            console.log("Already logged in.")
            // send message back to line when click submit button
            const submit = document.getElementById("submit")
            submit.addEventListener("click", function() {
                const line_id = document.getElementById("line_id").value
                const line_name = document.getElementById("line_name").value
                const real_name = document.getElementById("real_name").value
                const agree = document.getElementById("agree").checked
                const message = `${line_name}-${real_name}-${line_id}-${agree}`
                liff.sendMessages([{ type: 'text', text: message }])
                .then(() => {
                    console.log('message sent')
                    liff.closeWindow()
                })
                .catch((err) => {
                    alert('error: ', err)
                    liff.closeWindow()
                })
            })

            const profile = liff.getProfile().then(profile => {
                const real_name = document.getElementById("real_name")
                const real_name_col = document.getElementById("real_name_col")
                real_name_col.attributes.removeNamedItem("hidden")
                const line_id = document.getElementById("line_id")
                // set value and cancel hidden attribute
                line_id.setAttribute("value", profile.userId)
                const line_name = document.getElementById("line_name")
                line_name.setAttribute("value", profile.displayName)
                const line_name_col = document.getElementById("line_name_col")
                line_name_col.attributes.removeNamedItem("hidden")  
            })
        }

        
    })
    .catch((error) => {
        console.log(error)
    })
});

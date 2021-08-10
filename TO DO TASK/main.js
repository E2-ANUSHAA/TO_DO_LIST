showtask();
let addtaskinput = document.getElementById("addtaskinput");
let addtaskbtn1 = document.getElementById("addtaskbtn1");
let addtaskbtn2 = document.getElementById("addtaskbtn2");
let addtaskinput1 = document.getElementById("addtaskinput1");
let addtaskbtn = document.getElementById("addtaskbtn");
let hide = document.getElementsByClassName("hide");
let show = document.getElementsByClassName("show");
addtaskbtn.addEventListener("click", function() {
    var pop1 = document.getElementById("pop1");
    pop1.style.display = "block";
    savetaskbtn.style.display = "none";
    var btn6 = document.getElementById("addtaskbtn2");
    var btn7 = document.getElementById("addtaskbtn1");

    btn6.addEventListener("click", function() {
        pop1.style.display = "none";

    })
    btn7.addEventListener("click", function() {

        addtaskinputval = addtaskinput.value;

        if (addtaskinputval.trim() != 0) {
            pop1.style.display = "none";
            var notify = document.getElementById("notify");
            var close = document.getElementById("close");

            notify.classList.remove("hide");
            notify.classList.add("show");
            setTimeout(function() {
                notify.classList.add("hide");
                notify.classList.remove("show");
            }, 2000);
            close.addEventListener("click", function() {
                notify.classList.add("hide");
                notify.classList.remove("show");
            })



            let webtask = localStorage.getItem("localtask");
            if (webtask == null) {
                taskObj = [];
            } else {
                taskObj = JSON.parse(webtask);
            }
            taskObj.push({ 'task_name': addtaskinputval, 'completeStatus': false });
            // console.log(taskObj, 'Ashendra');
            localStorage.setItem("localtask", JSON.stringify(taskObj));
            addtaskinput.value = '';
        }


        showtask();
    })
})

// showtask
function showtask() {
    let webtask = localStorage.getItem("localtask");
    if (webtask == null) {
        taskObj = [];
    } else {
        taskObj = JSON.parse(webtask);
    }
    let html = '';
    let addedtasklist = document.getElementById("addedtasklist");
    taskObj.forEach((item, index) => {

        if (item.completeStatus == true) {
            taskCompleteValue = `<td class="completed">${item.task_name}</td>`;
        } else {
            taskCompleteValue = `<td>${item.task_name}</td>`;
        }
        html += `<tr>
        <th scope="row"></th>
        ${taskCompleteValue}
        <td><button type="button" onclick="edittask(${index})" class="text-primary" id = "vl1">Edit</button></td>
        <td><button type="button" class="text-success"  id=${index} >Complete</button></td>
        <td><button type="button" onclick="deleteitem(${index})" class="text-danger"  id = "vl3">Delete</button></td>
    </tr>`;
    });
    addedtasklist.innerHTML = html;
}

// edittask



function edittask(index) {
    var pop1 = document.getElementById("pop1");
    pop1.style.display = "block";
    addtaskbtn1.style.display = "none";
    addtaskbtn2.style.display = "none";
    savetaskbtn.style.display = "block";

    let saveindex = document.getElementById("saveindex");

    saveindex.value = index;


    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);

    addtaskinput.value = taskObj[index]['task_name'];


}

// savetask

let savetaskbtn = document.getElementById("savetaskbtn");
savetaskbtn.addEventListener("click", function() {
        var pop1 = document.getElementById("pop1");
        pop1.style.display = "none";
        let webtask = localStorage.getItem("localtask");
        let taskObj = JSON.parse(webtask);
        let saveindex = document.getElementById("saveindex").value;

        for (keys in taskObj[saveindex]) {


            if (keys == 'task_name') {
                taskObj[saveindex].task_name = addtaskinput.value;

            }

        }
        var edit = document.getElementById("edit");
        var close = document.getElementById("close");

        edit.classList.remove("hide");
        edit.classList.add("show");
        setTimeout(function() {
            edit.classList.add("hide");
            edit.classList.remove("show");
        }, 2000);
        close.addEventListener("click", function() {
                edit.classList.add("hide");
                edit.classList.remove("show");
            })
            // taskObj[saveindex] = {'task_name':addtaskinput.value, 'completeStatus':false} ;
            //  taskObj[saveindex][task_name] = addtaskinput.value;

        localStorage.setItem("localtask", JSON.stringify(taskObj));
        addtaskinput.value = '';
        showtask();

    })
    // deleteitem
function deleteitem(index) {
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    var popup = document.getElementById("popup");

    popup.style.display = "block";
    var btn3 = document.getElementById("btn3");
    var btn4 = document.getElementById("btn4");

    btn3.addEventListener("click", function() {
        popup.style.display = "none";

    })


    btn4.addEventListener("click", function() {
        taskObj.splice(index, 1);
        popup.style.display = "none";
        var trash = document.getElementById("delete");
        var close = document.getElementById("close");

        trash.classList.remove("hide");
        trash.classList.add("show");
        setTimeout(function() {
            trash.classList.add("hide");
            trash.classList.remove("show");
        }, 2000);
        close.addEventListener("click", function() {
            trash.classList.add("hide");
            trash.classList.remove("show");
        })

        localStorage.setItem("localtask", JSON.stringify(taskObj));
        showtask();

    })

}
// complete task
let addedtasklist = document.getElementById("addedtasklist");
addedtasklist.addEventListener("click", function(e) {
    // console.log(e);

    // showtask();
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);

    let mytarget = e.target;
    if (mytarget.classList[0] === 'text-success') {
        let mytargetid = mytarget.getAttribute("id");


        // let taskValue = taskObj[mytargetid]['task_name'];

        mytargetpresibling = mytarget.parentElement.previousElementSibling.previousElementSibling;

        // let mynewelem = mytargetpresibling.classList.toggle("completed");
        // taskObj.splice(mytargetid,1,mynewelem);
        for (keys in taskObj[mytargetid]) {
            if (keys == 'completeStatus' && taskObj[mytargetid][keys] == true) {
                taskObj[mytargetid].completeStatus = false;
                var notdone = document.getElementById("notdone");
                var close = document.getElementById("close");

                notdone.classList.remove("hide");
                notdone.classList.add("show");
                setTimeout(function() {
                    notdone.classList.add("hide");
                    notdone.classList.remove("show");
                }, 2000);
                close.addEventListener("click", function() {
                    notdone.classList.add("hide");
                    notdone.classList.remove("show");
                })

                // taskObj[mytargetid] = {'task_name':taskValue, 'completeStatus':false};
            } else if (keys == 'completeStatus' && taskObj[mytargetid][keys] == false) {
                taskObj[mytargetid].completeStatus = true;
                var done = document.getElementById("done");
                var close = document.getElementById("close");

                done.classList.remove("hide");
                done.classList.add("show");
                setTimeout(function() {
                    done.classList.add("hide");
                    done.classList.remove("show");
                }, 2000);
                close.addEventListener("click", function() {
                        done.classList.add("hide");
                        done.classList.remove("show");
                    })
                    //taskObj[mytargetid] = {'task_name':taskValue, 'completeStatus':true};
            }
        }
        //}
        // showtask();        
        localStorage.setItem("localtask", JSON.stringify(taskObj));
        showtask();
    }
})





// deleteall
let deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click", function() {

    var pop = document.getElementById("popup_box");

    pop.style.display = "block";
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");

    btn1.addEventListener("click", function() {
        pop.style.display = "none";

    })

    btn2.addEventListener("click", function() {

        let savetaskbtn = document.getElementById("savetaskbtn");
        let addtaskbtn = document.getElementById("addtaskbtn");
        let webtask = localStorage.getItem("localtask");
        let taskObj = JSON.parse(webtask);
        if (webtask == null) {
            taskObj = [];
        } else {
            taskObj = JSON.parse(webtask);
            taskObj = [];
        }

        savetaskbtn.style.display = "none";
        addtaskbtn.style.display = "block";
        pop.style.display = "none";

        var deleteall = document.getElementById("deleteall");
        var close = document.getElementById("close");

        deleteall.classList.remove("hide");
        deleteall.classList.add("show");
        setTimeout(function() {
            deleteall.classList.add("hide");
            deleteall.classList.remove("show");
        }, 2000);
        close.addEventListener("click", function() {
            deleteall.classList.add("hide");
            deleteall.classList.remove("show");
        })

        localStorage.setItem("localtask", JSON.stringify(taskObj));
        showtask();
    })

})

// serachlist
let searchtextbox = document.getElementById("searchtextbox");
searchtextbox.addEventListener("input", function() {
    let trlist = document.querySelectorAll("tr");
    Array.from(trlist).forEach(function(item) {
        let searchedtext = item.getElementsByTagName("td")[0].innerText;
        let searchtextboxval = searchtextbox.value;
        let re = new RegExp(searchtextboxval, 'gi');
        if (searchedtext.match(re)) {
            item.style.display = "table-row";
        } else {
            item.style.display = "none";
        }
    })
})
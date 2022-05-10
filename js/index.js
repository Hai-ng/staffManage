var staffList = [];


var createStaff = function () {
    validate();

    // var account = document.getElementById("tknv").value;
    // var name = document.getElementById("name").value;
    // var email = document.getElementById("email").value;
    // var password = document.getElementById("password").value;
    // var workday = document.getElementById("datepicker").value;
    // var salary = +document.getElementById("luongCB").value;
    // var position = document.getElementById("chucvu").value;
    // var worktime = +document.getElementById("gioLam").value;
    // // var account = document.getElementById("tknv").value;
    // // var account = document.getElementById("tknv").value;

    // var newStaff = new Staff(
    //     account,
    //     name,
    //     email,
    //     password,
    //     workday,
    //     salary,
    //     position,
    //     worktime
    // );
    // //push
    // staffList.push(newStaff);
    // //show
    // renderStaffs();

    // //save Local
    // saveData();
};

var deleteStaff = function (account) {
    var index = findStaff(account);
    if (index === -1) {
        alert("Not Found!");
        return;
    }
    staffList.splice(index, 1);
    renderStaffs();
    saveData();
}

//lay ra staff muon update
var getStaff = function (account) {
    var index = findStaff(account);
    if (index === -1) {
        alert("Not Found!");
        return;
    }

    var foundStaff = staffList[index];

    document.getElementById("tknv").value = foundStaff.account;
    document.getElementById("name").value = foundStaff.name;
    document.getElementById("email").value = foundStaff.email;
    document.getElementById("password").value = foundStaff.password;
    document.getElementById("datepicker").value = foundStaff.workday;
    document.getElementById("luongCB").value = foundStaff.salary;
    document.getElementById("chucvu").value = foundStaff.position;
    document.getElementById("gioLam").value = foundStaff.worktime;
}

var updateStaff = function () {
    var account = document.getElementById("tknv").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var workday = document.getElementById("datepicker").value;
    var salary = +document.getElementById("luongCB").value;
    var position = document.getElementById("chucvu").value;
    var worktime = +document.getElementById("gioLam").value;

    var index = findStaff(account);
    if (index === -1) {
        alert("Not Found!");
        return;
    }

    var foundStaff = staffList[index];

    foundStaff.account = account;
    foundStaff.name = name;
    foundStaff.email = email;
    foundStaff.password = password;
    foundStaff.workday = workday;
    foundStaff.salary = salary;
    foundStaff.position = position;
    foundStaff.worktime = worktime;

    renderStaffs();
    saveData();
}

var searchStaff = function () {
    var keyword = document.getElementById("searchName").value.toLowerCase().trim();
    var results = [];

    for (var i = 0; i < staffList.length; i++) {
        var typeStaff = staffList[i].setType().toLowerCase();
        if (typeStaff.includes(keyword)) {
            results.push(staffList[i]);
        }
    }

    renderStaffs(results);
    // console.log(results);
}

var findStaff = function (account) {
    for (var i = 0; i < staffList.length; i++) {
        if (staffList[i].account === account) {
            return i;
        }
    }
    //ko tim thấy -> quy uoc -1
    console.log(i);
    return -1;
}

var renderStaffs = function (data) {
    // if(!data) data = staffList;
    data = data || staffList;


    var dataHTML = "";
    for (var i = 0; i < data.length; i++) {
        dataHTML +=
            `
        <tr>
			<td>${data[i].account}</td>
			<td>${data[i].name}</td>
			<td>${data[i].email}</td>
			<td>${data[i].workday}</td>
			<td>${data[i].position}</td>
            <td>${data[i].calcSalary()}</td>
            <td>${data[i].setType()}</td>
            <td>
            <button class= "btn btn-danger" style="font-size: 12px; margin-bottom: 5px;" onclick="deleteStaff('${data[i].account}')"> Xóa </button>
            <button class="btn btn-primary" style="font-size: 12px;" onclick="getStaff('${data[i].account}')"  data-toggle="modal" data-target="#myModal"> Cập nhật </button>
            </td>
			<
		</tr>
        `
    }

    //xài dấu nháy để delete nhận vào 1 chuỗi

    document.getElementById("tableDanhSach").innerHTML = dataHTML;
    // console.log(dataHTML);
}

//save vào Local
var saveData = function () {
    var staffJSON = JSON.stringify(staffList);
    //local ko cho phep luu array
    //-> nen phải chuyen staffList thành chuỗi JSON
    localStorage.setItem("myStaff", staffJSON);
}

//map data de local save dc function()
var mapData = function (dataFromLocal) {
    var data = [];
    for (var i = 0; i < dataFromLocal.length; i++) {
        var currentStaff = dataFromLocal[i];
        var mappedStaff = new Staff(
            currentStaff.account,
            currentStaff.name,
            currentStaff.email,
            currentStaff.password,
            currentStaff.workday,
            currentStaff.salary,
            currentStaff.position,
            currentStaff.worktime
        );

        data.push(mappedStaff);
    }
    return data;
}

//get from local
var getData = function () {
    var staffJSON = localStorage.getItem("myStaff");
    //staffJSON rỗng = null -> if ko chay
    if (staffJSON) {
        //chuyen chuỗi thành Array trở lại
        staffList = mapData(JSON.parse(staffJSON));
        renderStaffs();
    }
}

getData();

var validate = function () {
    var account = document.getElementById("tknv").value;
    var pass = document.getElementById("password").value;

    length(pass, "tbMatKhau", 6, 10);
    // length(account, "tbMatKhau", 6, 10);
    require(account, "tbTKNV");
    console.log(account);
    document.getElementById("tbMatKhau").innerHTML = "hello";
}

var require = function (val, spanId) {
    if (!val) {
        document.getElementById(spanId).innerHTML = "*Vui lòng nhập dữ liệu!";
        return false;
    }
    document.getElementById(spanId).innerHTML = "";
    return true;
};

var length = function(val, spanId, min, max) {
    if(val.length < min || val.length > max) {
        document.getElementById(spanId).innerHTML = `* Độ dài phải từ ${min}-${max} kí tự `
        return false;
    }
    document.getElementById(spanId).innerHTML = "";
    return true;
}
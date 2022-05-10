function Staff(account, name, email, password, workday, salary, position, worktime, type) {
    this.account = account;
    this.name = name;
    this.email = email;
    this.password = password;
    this.workday = workday;
    this.salary = salary;
    this.position = position;
    this.worktime = worktime;
    // this.totalSalary = totalSalary;
    this.type = type;

    this.calcSalary = function () {
        var totalSalary;
        if (this.position === 'Sếp') {
            totalSalary = this.salary * 3;
        } else if (this.position ==="Trưởng phòng") {
            totalSalary = this.salary * 2;
        } else {
            totalSalary = this.salary;
        }
        return totalSalary;
    }

    this.setType = function () {
        var type;
        if(this.worktime >= 192) {
            type = "Xuất sắc";
        } else if (this.worktime >= 176) {
            type = "Giỏi";
        } else if (this.worktime >= 160) {
            type = "Khá";
        } else {
            type = "TB";
        }
        return type;
    }
}
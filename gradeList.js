'use strict';
const readline = require('readline-sync');

let allStudentInfo = [];
let count = 0 ;

//主页面
function mainPage() {
    let chooseNumber = readline.question(`
    1.添加学生
    2.生成成绩单
    3.退出
    请输入你的选择(1～3)：
    `);
    return chooseNumber;
}

//添加学生
function addStudentInfo() {
let studentInfo = readline.question(`
    请输入学生信息（格式：姓名,学号,民族,班级号,数学成绩,语文成绩,英语成绩,编程成绩），按回车提交：
    `);
judgeAndPutIntoArr(studentInfo);
}

function judgeAndPutIntoArr(studentInfo) {
    let studentInfoArr = [];
    let regexp = /^[\u4e00-\u9fa5]{2,},\d+,[\u4e00-\u9fa5]{2,},\d+,\d+(\.\d+)?,\d+(\.\d+)?,\d+(\.\d+)?,\d+(\.\d+)?$/m;
    if(regexp.test(studentInfo)){
        studentInfoArr = studentInfo.split(',');
        allStudentInfo[count] = {};
        allStudentInfo[count].name = studentInfoArr[0];
        allStudentInfo[count].id = studentInfoArr[1];
        allStudentInfo[count].nation = studentInfoArr[2];
        allStudentInfo[count].klass = studentInfoArr[3];
        allStudentInfo[count].mathGrade = studentInfoArr[4];
        allStudentInfo[count].chineseGrade = studentInfoArr[5];
        allStudentInfo[count].englishGrade = studentInfoArr[6];
        allStudentInfo[count].programmingGrade = studentInfoArr[7];
        allStudentInfo[count].perTotalGrade = perSum(studentInfoArr);
        allStudentInfo[count].perAverageGrade = perSum(studentInfoArr)/4;
        count++;
        console.log('\n'+"学生"+studentInfoArr[0]+"的成绩被添加");
        main();
        }else{
        let againStudentInfo = readline.question(`请按正确的格式输入（格式：姓名,学号,民族,班级,数学成绩,语文成绩,英语成绩,编程成绩）：
    `);
        judgeAndPutIntoArr(againStudentInfo);
      }
}

//打印成绩单
function initPrintGradelist() {
    let choosedId = readline.question(`请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：
    `);
    judgeAndPrint(choosedId);
}

//判断输入
function judgeAndPrint(choosedId) {
    let choosedIdArr = choosedId.split(',');
    let judgeArr = [];
    let regexp = /^\d+$/;
    let str =  `成绩单
姓名|数学|语文|英语|编程|编程|平均分|总分
===================================
`;
    for (let m in choosedIdArr) {
        if (regexp.test(choosedIdArr[m])) {
            judgeArr.push('true');
        }

    if (judgeArr.indexOf('false') > 0) {
        let againChoosedId = readline.question(`请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：
`);
        judgeAndPutIntoArr(againChoosedId);
     } else {
       for (let m in choosedIdArr)
          for (let i in allStudentInfo) {
              if (allStudentInfo[i].id === choosedIdArr[m])

                  str += `${allStudentInfo[i].name}|${allStudentInfo[i].mathGrade}|${allStudentInfo[i].chineseGrade}|${allStudentInfo[i].englishGrade}|${allStudentInfo[i].programmingGrade}|${allStudentInfo[i].perTotalGrade / 4}|${allStudentInfo[i].perTotalGrade}
`;
                }
            str += `===================================
全班总分平均数:${classTotalGrade()}
全班总分中位数:${classTotalMedia()}
`;
            console.log(str);
            str = '';
            main();
        }
    }
}


//计算每个人的总成绩
function perSum(studentInfoArr) {
    let perTotalGrade =0;
    for(let m=4; m<8; m++){
        perTotalGrade+=parseFloat(studentInfoArr[m]);
    }
    return perTotalGrade;
}
//全班总分平均数
function classTotalGrade() {
    let total =0;
    for(let i in allStudentInfo){
        total+=allStudentInfo[i].perTotalGrade;
    }
    return total/count;
}

//全班总分中位数
function classTotalMedia() {
    let sumArr= [];
    for(let i in allStudentInfo){
        sumArr.push(allStudentInfo[i].perTotalGrade)
    }
    sumArr = sumArr.sort(function (a,b) {
        return a-b;
    });
    //总分数组排序
    if(count%2 === 0){
        return (allStudentInfo[count/2].perTotalGrade+allStudentInfo[(count/2)-1].perTotalGrade)/2;
    }else {
        return allStudentInfo[(count-1)/2].perTotalGrade;
    }
}


function main() {
    let chooseNumber = mainPage();
    if(chooseNumber==='1'){
        addStudentInfo();
    }
    if(chooseNumber==='2'){
        initPrintGradelist();
    }
    if(chooseNumber==='3'){
    }
}

main();
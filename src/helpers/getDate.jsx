function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    if(month<10){
        month = `0${month}`
    }
    let date = today.getDate();
    if(date<10){
        date = `0${date}`
    }
    return `${year}-${month}-${date}`;
  }

export default getDate;

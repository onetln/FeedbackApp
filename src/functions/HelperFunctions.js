export function CurrentDateTime() {
    let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    let [yyyy,mm,dd,hh,mi] = localISOTime.split(/[/:\-T]/);
    return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
}


   //helper function to sort feedbacks by date
export function sortByDate(obj) {
    return obj.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function formatDate(date) {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
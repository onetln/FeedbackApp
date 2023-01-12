function CurrentDateTime() {
    let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    let [yyyy,mm,dd,hh,mi] = localISOTime.split(/[/:\-T]/);
    return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
}

export default CurrentDateTime

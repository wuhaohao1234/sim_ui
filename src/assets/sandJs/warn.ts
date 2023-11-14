
import $ from 'jquery'
class Warn

{
    lastDeg:string='270'


    Title(carNumber:string,info:string,handing:string) {
        // var dataDeg = $('#car'+carNumber).attr('data-deg');
        $("#car" + carNumber).children().find('span').removeClass('message_'+this.lastDeg)
        $("#car" + carNumber).children().find('p').removeClass('toolTip_'+this.lastDeg)
        $("#car" + carNumber).children().find('span').addClass('message_'+handing)
        $("#car" + carNumber).children().find('p').addClass('toolTip_'+handing)
        this.lastDeg = handing
        // 直接获取小区消息；
        // debugger;


        
    }

}

export default Warn;

import dayjs from 'dayjs'
export const formateTime =(val) =>{
    return dayjs(val).format('YYYY-MM-DD')
   }
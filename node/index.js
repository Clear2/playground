import axios from 'axios'

const instance = axios.create({
    timeout: 1000,
    headers: {
        'referer': 'https://m.s.weibo.com/vtopic/invite?ua=iPhone12,3__weibo__12.9.3__iphone__os13.6.1&from=10C9393010&query=%23%E5%8A%9E%E5%85%AC%E5%AE%A4%E4%B8%8D%E8%89%AF%E4%BD%93%E6%80%81%E4%BD%A0%E4%B8%AD%E6%8B%9B%E4%BA%86%E4%B9%88%23',
        'cookie': 'SCF=AsGVt2HJFUC-cWX9xH91vlEAuG9Yup0nsF3vIleUHxySqQJxpJfMVmNTHmH_mlROKA..; SUB=_2A25OLFO5DeRhGeVL7lYZ9y_JyTuIHXVtPgfxrDV8PUJbitANLWvSkWtNTC0Aj59No1lekbF4JtkAoh0JjivX0Rr_; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WWx7xl7nWiuPNaqOrlmBnc15NHD95Q0SK-X1hMpSKzNWs4DqcjZBcpaUc4TIg4r97tt',
        'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Weibo (iPhone12,3__weibo__12.9.3__iphone__os13.6.1)',
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'origin': 'https://m.s.weibo.com'
    }
});
const init = () => {
    instance.post('https://m.s.weibo.com/ajax_vtopic/issueInviteList', {
        query: '#办公室不良体态你中招了么#',
        c_tag: '推荐'
    }).then(res => {
        console.log(res.data)
        let data = res.data.data
        let uid= []
        for (let i = 0; i < data.length; i++) {
            uid.push(data[i].uid)
        }
        const params = new URLSearchParams({
            query: '#办公室不良体态你中招了么#'
        });
        params.append('uids',uid.join(','))

        instance.post('https://m.s.weibo.com/ajax_vtopic/issueInviteUser', params).then(res => {
            console.log('---->>',res.data)
        })

    })
}

setInterval(() => {
    init()
}, 2500)
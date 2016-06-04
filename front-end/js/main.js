var R = require('ramda')

var ajax_call = options =>
    () => {
        var request = new XMLHttpRequest()

        request.open(
            options.request_type,
            options.url,
            true)

        request.setRequestHeader(
            'Content-Type',
            'application/x-www-form-urlencoded;'
                + 'charset=UTF-8')

        request.onload = function () {
            if (this.status >= 200
                && this.status < 400) {

                var data = JSON.parse(this.response)
                options.success(data)
            } else {
                options.failure()
            }
        }

        request.onerror = options.failure

        if(options.data) {
            request.send('data=' + JSON.stringify(options.data))
        } else {
            request.send()
        }

    }
document.querySelector('#clickit').onclick =
    ajax_call({
        request_type: 'GET',
        url: '/ajax',
        failure: () => console.err('Something\'s gone wrong'),
        success: data => document.querySelector('#message').innerHTML = data.message
    })

document.querySelector('#clickthis').onclick =
    ajax_call({
        request_type: 'POST',
        url: '/ajax',
        failure: () => console.err('Something\'s gone wrong'),
        success: data => document.querySelector('#message').innerHTML = data.message,
        data: {
            message: 'Your mom is a beehive',
            banana: 'elbows'
        }
    })

document.querySelector('#clickthisother').onclick =
    ajax_call({
        request_type: 'PUT',
        url: '/ajax',
        failure: () => console.err('Something\'s gone wrong'),
        success: data => document.querySelector('#message').innerHTML = data.message,
        data: {
            message: 'Banana fingers',
            banana: 'Fake nursury rhymes.'
        }
    })

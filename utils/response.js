class NotFoundError extends Error {
    constructor(msg){
        super(msg)
        this.name ='NotFoundError'
    }
}

function success(res, message, data = {}, code = 200){
    res.status(code).json({
        status: true,
        message,
        data
    })
}

function failure(res, error){
    if(error.name === 'SequelizeValidationError'){
        const errors = error.errors.map(item => item.message)
       return res.status(400).json({
            status: false,
            messages: '请求参数错误',
            errors
        })
    }
    if(error.name === 'NotFoundError'){
        return res.status(404).json({
            status: false,
            messages: '资源不存在',
            errors: [error.message]
        })
    }
    res.status(500).json({
        status: false,
        messages: '服务器错误',
        errors: [error.message]
    })

}
module.exports = {
    NotFoundError,
    success,
    failure
}
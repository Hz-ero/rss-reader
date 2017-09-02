module.exports = {
    "extends": "airbnb",
    "rules": {
        "react/jsx-filename-extension": 0,
        "import/extensions": 0,
        "no-underscore-dangle": 0,
        "import/no-extraneous-dependencies": 0,
        "global-require": 0,
        //关闭额外的分号检查
        //0:关闭，1:警告，2:异常
        "semi": 0,
        //字符串必须使用单引号
        "quotes": [
            "error",
            "single"
        ]
    }
};
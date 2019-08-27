let api = {
    prefix: (process.env.NODE_ENV === 'development') ? 'http://192.168.88.2:4000/' : '',
    statistic: {
        all: 'statistic/all',
        create: 'statistic/new'
    }
};

export default api;
let api = {
    prefix: (process.env.NODE_ENV === 'development') ? 'http://192.168.81.253:4000/' : '',
    statistic: {
        all: 'statistic/all',
        create: 'statistic/new'
    }
};

export default api;
module.exports = {
  plugins: {
  'autoprefixer': {
      browsers: 'last 5 version'
    },
  'postcss-import': {},
  'cssnano': {},
    'postcss-cssnext':{},
    'pixrem':{},
    'postcss-pxtorem':{
    	rootValue: 16, //你在html节点设的font-size大小
    	unitPrecision: 5, //转rem精确到小数点多少位
    	propList: ['font', 'font-size', 'line-height', 'letter-spacing'],//指定转换成rem的属性，支持 * ！
    	selectorBlackList: [],// str/reg 指定不转换的选择器，str时包含字段即匹配
    	replace: true,
    	mediaQuery: false, //媒体查询内的px是否转换
    	minPixelValue: 0 //小于指定数值的px不转换
    }
  }
}

// 根据时间和场景生成多样化的对话
export const getRandomDialogue = (type, context = {}) => {
  const dialogues = {
    // 成功/赚钱时
    success: [
      '667！无敌的！',
      '太强了吧我！',
      '我就说我行！',
      'ok，这波稳了',
      '看我表演！',
      '哈哈哈哈，爽！',
    ],

    // 失败/亏钱时
    fail: [
      '我是猪啊...',
      '我透！怎么会这样',
      '完了，又亏了',
      '猪脑子操作',
      '早该听老子的',
      '这波血亏啊',
    ],

    // 赌博/冒险时
    gamble: [
      '土块一把！',
      '梭哈就完了！',
      '赌就完事了！',
      '土块才有灵魂！',
      'all in！',
      '赌狗心态！',
    ],

    // 看热闹/围观时
    watch: [
      '乐子来了！',
      '有乐子看了',
      '这波有意思',
      '让我康康',
      '好戏开场了',
      '坐等好戏',
    ],

    // 震惊/意外时
    shock: [
      '我透！',
      '什么情况？！',
      '卧槽！',
      '这也行？！',
      '震撼我妈！',
      '离谱！',
    ],

    // 社交/交朋友时
    social: [
      'ok，交个朋友',
      '社牛本色！',
      '认识一下',
      '哥们儿，你可以啊',
      '一起整点乐子',
      '来来来，交流一下',
    ],

    // 学习/认真时
    study: [
      'ok，学到了',
      '稳健发展',
      '不能当猪',
      '要充实自己',
      '知识就是力量',
      '好好学习',
    ],

    // 拒绝时
    reject: [
      '别坑老子',
      '老子不上当',
      '想得美',
      '滚蛋',
      '不可能',
      '做梦呢',
    ],

    // 早上起床
    morning: [
      'ok，新的一天',
      '今天也要无敌的！',
      '起床了，干活！',
      '又是美好的一天',
      '冲冲冲！',
    ],

    // 晚上睡觉
    night: [
      '今天还行吧',
      '累死老子了',
      '睡觉睡觉',
      '明天继续土块',
      '休息休息',
    ],

    // 周末
    weekend: [
      '周末乐子时间！',
      '终于放松了',
      '整点不一样的',
      '周末快乐！',
      '躺平一下',
    ],

    // 考试前
    beforeExam: [
      '我透，要考试了',
      '临时抱佛脚',
      '紧张紧张',
      '希望不挂科',
      '佛祖保佑',
    ],

    // 考试后
    afterExam: [
      '终于考完了',
      '应该能过吧',
      '解放了！',
      '不管了，及格就行',
      '考得还行',
    ],

    // 新年
    newYear: [
      '新年新气象！',
      '今年要发大财！',
      '一年之计在于春',
      '新的开始！',
      '今年要无敌的！',
    ],

    // 春天
    spring: [
      '春天来了',
      '万物复苏',
      '适合土块的季节',
      '春暖花开',
    ],

    // 夏天
    summer: [
      '热死老子了',
      '夏天真难受',
      '空调续命',
      '要融化了',
    ],

    // 秋天
    autumn: [
      '秋高气爽',
      '舒服的季节',
      '秋天真好',
      '凉快多了',
    ],

    // 冬天
    winter: [
      '冷死老子了',
      '冬天太难了',
      '被窝是王道',
      '冻成狗了',
    ],
  };

  const options = dialogues[type] || ['ok'];
  return options[Math.floor(Math.random() * options.length)];
};

// 根据游戏状态生成情境对话
export const getContextDialogue = (gameState) => {
  const { season, player, eventCount } = gameState;

  // 根据压力值
  if (player.stress > 80) {
    return getRandomDialogue('fail');
  }

  // 根据金钱
  if (player.money > 50000) {
    return getRandomDialogue('success');
  }

  if (player.money < 1000) {
    return '我透，要吃土了...';
  }

  // 根据季节
  const seasonDialogues = {
    '春季': () => getRandomDialogue('spring'),
    '夏季': () => getRandomDialogue('summer'),
    '秋季': () => getRandomDialogue('autumn'),
    '冬季': () => getRandomDialogue('winter'),
  };

  if (seasonDialogues[season] && Math.random() < 0.3) {
    return seasonDialogues[season]();
  }

  // 根据事件进度
  if (eventCount < 20) {
    return 'ok，慢慢来';
  } else if (eventCount < 50) {
    return '渐入佳境！';
  } else if (eventCount < 80) {
    return '快了快了！';
  } else {
    return '最后冲刺！';
  }
};

async function postData(url) {
  let response = await fetch(url);
  response = await response.text();
  return response;
}

async function find() {
  let name = prompt('Введите название акции');
  let date = prompt('Введите время дату(в формате gggg-mm-dd)');

  let url = `http://macrotrends.net/assets/php/stock_data_export.php?t=${name}`;

  try {
    let DATA = await postData(url); //получили список всех цен в виде ооочень длинной строки
    console.log('DATA до: ', DATA);
    DATA = DATA.split(' '); //создали массив, элементами которого стали подстроки. Разделителем является пробел. Т.е. берется подстрока между двумя пробелами в строке. Посмотри в консоли, что представляет из себя DATA до split и после
    console.log('DATA после: ', DATA);

    //в html-элемент в DOM-дереве с классом 'all' отобразили DATA
    document.querySelector('.all').innerHTML = DATA;

    let cost = DATA.filter((item) => item.indexOf(date) !== -1); // отфильтровали элементы массива, оставив только те, у которых дата совпадает с введенной пользоателемм (т.е. остался всего один элемент, либо ни одного, если за этот день нет данных)
    if (cost.length === 0) throw new Error('За этот день нет данных!'); //кинули исключение, если нет данных
    console.log('cost до: ', cost);
    cost = cost[0].split(','); //опять разделили стркоу на подстроки. Посмотри в консоли, что было до и после split
    console.log('cost после: ', cost);
    cost = cost[cost.length - 2]; //посмотрев что получилось можно понять, что предпоследний элемент в получившемся массиве - это и есть искомая стоимость

    let log = `Цена акций ${name} в день ${date} = "${cost}$`; //составили строку, которую будем выводить в консоль и в html
    document.querySelector('.cost__').innerHTML = log;
    console.log(log);
  } catch (error) {
    console.error(error);
    document.querySelector('.cost__').innerHTML = error;
  }
}

find(); //выше объявили функцию, теперь пора её вызвать

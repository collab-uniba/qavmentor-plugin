import store from './store'

export function getPost(){
  var html_question = document.getElementById('wmd-preview')
  var title = document.getElementById('title');
  var tag = document.getElementById('tagnames');


  var html_question_inner = ''
  if(html_question)
    html_question_inner = html_question.innerHTML
  else
    html_question = document.getElementById('wmd-preview')
  var date = new Date()

  return {
      "day": (date.getDay()).toString(),
      "hour": (date.getHours()).toString(),
      "body": html_question_inner,
      "title":title.value,
      "tags": tag.value.split(" "),
      "modified": store.subject.modified
  }
}




export function countTipCategory(category, tip_list) {
  var count = 0;
  for (var i = 0; i < tip_list.length; i++) {
    if(tip_list[i].category === category){
      count+=1;
    }
  }
  return count;
}

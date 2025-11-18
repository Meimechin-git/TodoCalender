# TodoCalender

## 概要

React、TypeScript、Tailwind CSS を使用して Todoリストとカレンダー機能を統合したウェブアプリケーションである。


## 機能解説
-----
<img src="/image/image0.png" width="500px">  



  
上の画像のようにTodoCalenderには3つの見出しがある。

  
- CALENDER: いつの日にタスクが入っているか一目で分かる。
- DAILY TODOLIST: CALENDERの選択日のTodoListを確認できる。
- ALL TODOLIST: すべてのTodoListを優先度順に確認できる。

  


-----
<img src="/image/image1.png" width="500px">  


上の画像のようにALL TODOLISTの下にタスクを追加するためのUIがある。  
名前は2字以上32字以内で、優先度は高、中、低の3段階である。  


-----
<img src="/image/image2.png" width="500px">  

  
上の画像のようにカテゴリーは赤の課題と黄緑の仕事、青の外出、橙のその他の4種類ある。  
入力が完了して、追加ボタンをクリックするとタスクが追加される。  


-----
<img src="/image/image3.png" width="500px">  


当アプリで複数のTodoを入れた時のビジュアルが上の画像のようになる。  
CALENDERでは、それぞれの日に入れられたTodoのカテゴリーの色が表示される。  
DAIY TODOLISTでは、CALENDERで選択した日のTODOLISTを優先度順にみることができる。  
ALL TODOLISTでは、すべてのタスクを優先度順にみることができる。  


----
<img src="/image/image4.png" width="500px">  


タスクの左側にあるチェックボックスをクリックすると、完了済みにできる。  
完了済みの情報はDAILY TODOLISTとALL TODOLISTどちらにも連携して反映される。  
また、一番下の"完了済みのタスクを削除"というボタンをクリックすると文字通り完了済みのタスクがすべて削除される。　　
タスクの右側にある削除ボタンはカーソルを合わせると赤くはっきり映る。そして、クリックすると個々のタスクを消すことができる。　　


## 開発履歴

- 2025年10月23日：プロジェクト開始

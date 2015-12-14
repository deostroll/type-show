angular.module('myapp', [])
  .controller('MainCtrl', function($scope, $document, $timeout){
    var counter = 0;
    $scope.texts = [];
    $scope.edit = true;
    $scope.view = 'compose';
    var $markdown = $('#markdown');

    $scope.compose = {
      title: '',
      content: '',
      mode: 'new'
    };

    function addSlide(title, content) {
        counter++;
        $scope.texts.push({
          id: counter,
          title: title,
          content: content,
          markdown: markdown.toHTML(content),
          selected: false
        });
    };

    function updateSlide(id, title, content) {
      var items = $scope.texts;
      items.filter(function(itm) {
        return itm.id === id;
      }).forEach(function(item){
        item.title = title;
        item.content = content;
      });
    }

    function removeSlide(index) {
      $scope.texts.splice(index, 1);
    }

    function select(item) {
      $scope.texts.forEach(function(i){
        if(i === item) {
          i.selected = true;
        }
        else {
          i.selected = false;
        }
      });
    }
    $scope.add = function () {
      addSlide($scope.title, $scope.content);
    };
    //var preview = $('#preview');
    var showTyped = function() {
      // console.log('showTyped', $('#preview'));
      $('#preview').typed({
        strings: $scope.texts.map(function(txt){ return txt.markdown; }),
        typeSpeed: 0,
        content: 'html'
      });
    };

    $scope.run = function() {
      $scope.edit = false;
      $document.bind('keyup', function(evt){
        if(evt.keyCode === 27) {
          $scope.edit = true;
          $document.unbind('keyup');
          $scope.$apply();
        }
      });
    };

    $scope.initTyped = showTyped;

    $scope.select = select;

    $scope.load = function(itm) {
      var idx = $scope.texts.indexOf(itm);
      if(idx > -1) {
        var md = $scope.texts[idx].markdown;
        $('#markdown').html(md);
        $scope.view = 'view';
      }
    }
    addSlide('Code 1','\t\t\t\tgit clone https://github.com/deostroll/generator-konva.git');
    addSlide('Code 2','This is great _news_');
  });

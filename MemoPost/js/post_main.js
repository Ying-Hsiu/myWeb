// Generated by CoffeeScript 1.12.6
(function() {
  var ACTION, BOARD, ID, INDEX, getLocal, vm;

  ACTION = {
    ADD: false,
    RESET: false
  };

  BOARD = $("#post_board");

  ID = "";

  INDEX = "";

  getLocal = function() {
    return JSON.parse(localStorage["POSTLIST"]);
  };

  vm = new Vue({
    el: '#app',
    data: {
      list: getLocal(),
      post: {
        date: "",
        content: "",
        color: "yellow"
      }
    },
    methods: {
      search: function(id) {
        var data, i, index, len, ref;
        ref = this.list;
        for (index = i = 0, len = ref.length; i < len; index = ++i) {
          data = ref[index];
          if (data.id === id) {
            return index;
          }
        }
      },
      add: function() {
        var data, id;
        id = Math.round(new Date().getTime() / 1000);
        data = {
          id: id,
          date: this.post.date,
          content: this.post.content,
          color: this.post.color
        };
        this.list.push(data);
        ACTION.ADD = true;
        return ID = id;
      },
      edit: function(id) {
        var data;
        INDEX = this.search(id);
        ID = id;
        data = this.list[INDEX];
        this.post.date = data.date;
        this.post.content = data.content;
        return this.post.color = data.color;
      },
      update: function() {
        var data, list, target;
        target = $("#" + ID);
        data = {
          id: ID,
          date: this.post.date,
          content: this.post.content,
          color: this.post.color,
          locX: target.css("left"),
          locY: target.css("top")
        };
        list = JSON.parse(localStorage["POSTLIST"]);
        list[INDEX] = data;
        this.list = list;
        return localStorage["POSTLIST"] = JSON.stringify(list);
      },
      save: function() {
        var data, list, target;
        target = $("#" + ID);
        data = {
          id: ID,
          date: this.post.date,
          content: this.post.content,
          color: this.post.color,
          locX: target.css("left"),
          locY: target.css("top")
        };
        list = JSON.parse(localStorage["POSTLIST"]);
        list.push(data);
        this.list = list;
        return localStorage["POSTLIST"] = JSON.stringify(list);
      },
      remove: function(id) {
        var list;
        INDEX = this.search(id);
        list = JSON.parse(localStorage["POSTLIST"]);
        list.splice(INDEX, 1);
        this.list = list;
        return localStorage["POSTLIST"] = JSON.stringify(list);
      },
      reset: function() {
        this.post.date = "";
        this.post.content = "";
        return this.post.color = "yellow";
      },
      move: function(id) {
        var data;
        INDEX = this.search(id);
        ID = id;
        data = this.list[INDEX];
        this.post.date = data.date;
        this.post.content = data.content;
        this.post.color = data.color;
        return ACTION.RESET = true;
      },
      clear: function() {
        var self;
        self = this;
        return swal({
          title: '清除所有便利貼?',
          text: "注意!資料清除後將無法還原。:(",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '全部清掉',
          cancelButtonText: '讓我再想想'
        }).then(function() {
          localStorage["POSTLIST"] = "[]";
          self.list = JSON.parse(localStorage["POSTLIST"]);
          return swal({
            text: 'WOW!又是全新的開始！'
          });
        });
      }
    },
    mounted: function() {
      var self;
      self = this;
      $(window).on("mousemove", function(event) {
        var target;
        if (ACTION.ADD) {
          target = $("#" + ID);
          target.css("left", event.clientX - 400 + 'px');
          return target.css("top", event.clientY - 100 + 'px');
        } else if (ACTION.RESET) {
          target = $("#" + ID);
          target.css("left", event.clientX - 400 + 'px');
          return target.css("top", event.clientY - 100 + 'px');
        }
      });
      $(window).on("mousedown", function(event) {
        var target;
        if (ACTION.ADD) {
          target = $("#" + ID);
          self.save();
          return ACTION.ADD = false;
        } else if (ACTION.RESET) {
          target = $("#" + ID);
          self.update();
          return ACTION.RESET = false;
        }
      });
      return $(".datepicker").datepicker({
        format: 'yyyy/mm/dd',
        startDate: '0'
      }).on("change", function(event) {
        return self.post.date = event.target.value;
      });
    }
  });

  $(function() {});

}).call(this);

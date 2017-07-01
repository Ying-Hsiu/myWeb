ACTION = {
	ADD: false
	RESET: false
}
BOARD = $("#post_board")
ID = ""
INDEX = ""
getLocal= ->
	if localStorage["POSTLIST"] == undefined
		localStorage["POSTLIST"] = "[]"
	return JSON.parse(localStorage["POSTLIST"])
	
vm = new Vue(
	el: '#app'
	data:{
		list: getLocal()
		post: {
			date: ""
			content: ""
			color: "yellow"
		}
	}
	methods:{
		search: (id)->
			for data,index in @list 
				if data.id == id
					return index
		add : ->
			id = Math.round(new Date().getTime()/1000) 
			data = {
				id : id
				date : @post.date
				content : @post.content
				color : @post.color
			}
			@list.push(data)
			ACTION.ADD = true
			ID = id
		edit: (id)->
			INDEX = @search(id)
			ID = id
			data = @list[INDEX]
			@post.date = data.date
			@post.content = data.content
			@post.color = data.color
		update: ->
			target = $("##{ID}")
			data = {
				id: ID
				date : @post.date
				content : @post.content
				color : @post.color
				locX: target.css("left")
				locY: target.css("top")
			}
			list = JSON.parse(localStorage["POSTLIST"])
			list[INDEX] = data
			@list = list
			localStorage["POSTLIST"] = JSON.stringify(list)
		save: ->
			target = $("##{ID}")
			data = {
				id: ID
				date : @post.date
				content : @post.content
				color : @post.color
				locX: target.css("left")
				locY: target.css("top")
			}
			list = JSON.parse(localStorage["POSTLIST"])
			list.push(data)
			@list = list
			localStorage["POSTLIST"] = JSON.stringify(list)
		remove : (id)->
			INDEX = @search(id)
			list = JSON.parse(localStorage["POSTLIST"])
			list.splice(INDEX, 1)
			@list = list
			localStorage["POSTLIST"] = JSON.stringify(list)
		reset: ->
			@post.date = ""
			@post.content = ""
			@post.color = "yellow"
		move: (id)->
			INDEX = @search(id)
			ID = id
			data = @list[INDEX]
			@post.date = data.date
			@post.content = data.content
			@post.color = data.color
			ACTION.RESET = true
		clear : ->
			self = this
			swal(
				title: '清除所有便利貼?'
				text: "注意!資料清除後將無法還原。:("
				type: 'warning'
				showCancelButton: true
				confirmButtonColor: '#3085d6'
				cancelButtonColor: '#d33'
				confirmButtonText: '全部清掉'
				cancelButtonText: '讓我再想想'
				).then ->
					localStorage["POSTLIST"] = "[]"
					self.list = JSON.parse(localStorage["POSTLIST"])
					swal(
						text: 'WOW!又是全新的開始！'
						)
	}
	mounted: ->
		self = this
		$(window).on "mousemove", (event)->
			if ACTION.ADD
				target = $("##{ID}")
				target.css("left",event.clientX-400+'px')
				target.css("top",event.clientY-100+'px')
			else if ACTION.RESET
				target = $("##{ID}")
				target.css("left",event.clientX-400+'px')
				target.css("top",event.clientY-100+'px')
		$(window).on "mousedown", (event)->	
			if ACTION.ADD
				target = $("##{ID}")
				self.save()
				ACTION.ADD = false
			else if ACTION.RESET
				target = $("##{ID}")
				self.update()
				ACTION.RESET = false
		
		$(".datepicker").datepicker(
			format: 'yyyy/mm/dd'
			startDate: '0'
		).on "change" , (event)->
			self.post.date = event.target.value

)

$ ->


	





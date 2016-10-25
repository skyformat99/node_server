
if (typeof Msg == "undefined") {
	var Msg = {};
	Msg.REQ_HEARTBEAT = 0; //发送心跳到gate_server
	Msg.REQ_SELECT_GATE = 1; //选择gate_server
	Msg.REQ_CONNECT_GATE = 2; //登录gate_server
	Msg.REQ_FETCH_ROLE = 3; //获取角色
	Msg.REQ_CREATE_ROLE = 4; //创建角色
	Msg.REQ_FETCH_MAIL = 5; //获取邮件
	Msg.REQ_PICKUP_MAIL = 6; //收取附件
	Msg.REQ_DEL_MAIL = 7; //删除邮件
	Msg.REQ_FETCH_BAG = 8; //获取背包
	Msg.REQ_FETCH_RANK = 200; //获取排行榜
	Msg.REQ_CREATE_GUILD = 201; //创建公会
	Msg.REQ_DISSOVE_GUILD = 202; //解散公会
	Msg.RES_HEARTBEAT = 0; //发送心跳到gate
	Msg.RES_SELECT_GATE = 1; //选择gate_server
	Msg.RES_CONNECT_GATE = 2; //登录gate_server
	Msg.RES_ROLE_INFO = 3; //角色信息更新
	Msg.RES_ERROR_CODE = 4; //返回错误号
	Msg.RES_MAIL_INFO = 5; //邮件信息更新
	Msg.RES_PICKUP_MAIL = 6; //收取附件
	Msg.RES_DEL_MAIL = 7; //删除邮件
	Msg.RES_FETCH_BAG = 8; //获取背包
	Msg.RES_FETCH_RANK = 200; //获取排行榜
	Msg.RES_CREATE_GUILD = 201; //创建公会
	Msg.RES_DISSOVE_GUILD = 202; //解散公会
	Msg.NODE_CENTER_NODE_INFO = 0; //同步进程节点信息到center
	Msg.NODE_ERROR_CODE = 1; //进程节点发送错误号
	Msg.NODE_GATE_CENTER_VERIFY_TOKEN = 2; //gate通知center校验token
	Msg.NODE_GATE_GAME_PLAYER_LOGOUT = 3; //gate通知game玩家下线
	Msg.NODE_GATE_PUBLIC_PLAYER_LOGIN_LOGOUT = 4; //gate通知public玩家上线下线
	Msg.NODE_GAME_PUBLIC_PLYAER_LOGIN = 5; //game通知public玩家上线
	Msg.NODE_GAME_CENTER_PLAYER_LOGIN_LOGOUT = 6; //game通知center玩家上线下线
	Msg.NODE_PUBLIC_GAME_GUILD_INFO = 7; //public通知game玩家公会信息
	Msg.NODE_GAME_DB_CREATE_PLAYER = 200; //创建玩家
	Msg.NODE_GAME_DB_LOAD_PLAYER = 201; //加载玩家信息
	Msg.NODE_GAME_DB_SAVE_PLAYER = 202; //保存玩家信息
	Msg.NODE_DB_GAME_PLAYER_INFO = 203; //db返回玩家信息
	Msg.NODE_PUBLIC_DB_CREATE_GUILD = 204; //创建公会
	Msg.NODE_PUBLIC_DB_LOAD_DATA = 205; //加载public数据
	Msg.NODE_PUBLIC_DB_SAVE_DATA = 206; //保存public数据
	Msg.NODE_PUBLIC_DB_DELETE_DATA = 207; //删除public数据
	Msg.NODE_DB_PUBLIC_DATA = 208; //db返回public数据
	Msg.NODE_LOG_PLAYER_LOGOUT = 210; //玩家登出日志
}

/*
*	描述：game_player类
*	作者：张亚磊
*	时间：2016/02/24
*/

function Game_Player() {
	this.sync_player_data_tick = util.now_sec();
	this.gate_eid = 0;
	this.sid = 0;
	this.is_change = false;
	this.role_info = new Role_Info();
	this.mail = new Mail();
	this.bag = new Bag();
}

//玩家上线，加载数据
Game_Player.prototype.login = function(gate_eid, sid, msg) {
	log_info('********game_player login, role_id:', msg.player_data.role_info.role_id, ' role_name:', msg.player_data.role_info.role_name, ' gate_eid:', gate_eid, ' sid:', sid);
	this.gate_eid = gate_eid;
	this.sid = sid;
	this.role_info = msg.player_data.role_info;
	this.mail.load_data(this, msg);
	this.bag.load_data(this, msg);
	
	this.sync_login_to_client();
	this.sync_login_logout_to_public(true);
	sid_game_player_map.set(this.sid, this);
	role_id_game_player_map.set(this.role_info.role_id, this);
	role_name_game_player_map.set(this.role_info.role_name, this);
}

//玩家离线，保存数据
Game_Player.prototype.logout = function() {
	log_info('********game_player logout, role_id:', this.role_info.role_id, " role_name:", this.role_info.role_name, ' sid:', this.sid);
	this.role_info.logout_time = util.now_sec();
	logout_map.set(this.sid, this.role_info.logout_time);
	
	this.sync_player_data_to_db(true);
	this.sync_logout_to_log();
	this.sync_login_logout_to_public(false);
	sid_gate_eid_map.delete(this.sid);
	sid_game_player_map.delete(this.sid);
	role_id_game_player_map.delete(this.role_info.role_id);
	role_name_game_player_map.delete(this.role_info.role_name);
}

Game_Player.prototype.tick = function(now) {
	//同步玩家数据到数据库
	if(this.is_change){
		if (now - this.sync_player_data_tick >= 15) {
			this.sync_player_data_to_db(false);
			this.sync_player_data_tick = now;
		}
	}
}

Game_Player.prototype.send_success_msg = function(msg_id, msg) {
	this.is_change = true;
	send_msg(this.gate_eid, 0 , msg_id, Msg_Type.NODE_S2C, this.sid, msg);
}

Game_Player.prototype.send_error_msg = function(error_code) {
	var msg = new s2c_5();
	msg.error_code = error_code;
	send_msg(this.gate_eid, 0, Msg.RES_ERROR_CODE, Msg_Type.NODE_S2C, this.sid, msg);
}

Game_Player.prototype.sync_login_to_client = function() {
	var msg = new s2c_4();
	msg.role_info = this.role_info;
	this.send_success_msg(Msg.RES_ROLE_INFO, msg);
}

Game_Player.prototype.sync_login_logout_to_public = function(login) {
	var msg = new node_5();
	msg.login = login;
	msg.role_info = this.role_info;
	send_msg_to_public(Msg.SYNC_GAME_PUBLIC_LOGIN_LOGOUT, this.sid, msg);
}

Game_Player.prototype.sync_player_data_to_db = function(logout) {
	log_info('********sync_player_data_to_db, logout:', logout, ' role_id:', this.role_info.role_id, ' role_name:', this.role_info.role_name);
	var msg = new node_203();
	msg.logout = logout;
	msg.player_data.role_info = this.role_info;
	this.mail.save_data(msg);
	this.bag.save_data(msg);
	send_msg_to_db(Msg.SYNC_GAME_DB_SAVE_PLAYER, this.sid, msg);
	this.is_change = false;
}

Game_Player.prototype.sync_logout_to_log = function() {
	var msg = new node_210();
	msg.logout_info.role_id = this.role_info.role_id;
	msg.logout_info.role_name = this.role_info.role_name;
	msg.logout_info.account = this.role_info.account;
	msg.logout_info.level = this.role_info.level;
	msg.logout_info.exp = this.role_info.exp;
	msg.logout_info.create_time = this.role_info.create_time;
	msg.logout_info.login_time = this.role_info.login_time;
	msg.logout_info.logout_time = this.role_info.logout_time;
	send_msg_to_log(Msg.SYNC_LOG_PLAYER_LOGOUT, this.sid, msg);
}

Game_Player.prototype.add_exp = function(exp) {
	if (exp <= 0) {
		return this.send_error_msg(Error_Code.CLIENT_PARAM_ERROR);
	}
	
	//经验增加升级
	this.role_info.exp += exp;
	var max_player_level = config.util_json.max_player_level;
	for (var i = this.role_info.level; i < max_player_level; ++i) {
		var level_exp = config.level_json[i].level_exp;
		if (this.role_info.exp < level_exp) 
			break;
		
		this.role_info.level++;
		this.role_info.exp -= level_exp;
	}

	this.sync_login_to_client();
}

Game_Player.prototype.set_guild_info = function(msg) {
	this.role_info.guild_id = msg.guild_id;
	this.role_info.guild_name = msg.guild_name;
	this.is_change = true;
	log_info('set_guild_info, role_id:', this.role_info.role_id, " role_name:", this.role_info.role_name, 
	" guild_id:", this.role_info.guild_id, " guild_name:", this.role_info.guild_name);
}

/* eslint-disable camelcase */
/* eslint-disable sort-keys */
/* eslint-disable no-console */
import WebSocket from 'ws'
import axios from 'axios'
import { EventEmitter } from 'events'
import { log } from 'wechaty-puppet'
import * as fs from 'fs'

type ContactRaw = {
  headimg: string
  name: string
  node: string
  remarks: string
  wxcode: string
  wxid: string
}

type RoomRaw = {
  room_id: string
  member: string[],
  address: number
}

interface ResponseData {
  content: string;
  id: string;
  receiver: string;
  sender: string;
  srvid: number;
  status: string;
  time: string;
  type: number;
}

interface ContentRaw {
  content: string;
  detail: string;
  id1: string;
  id2: string;
  thumb: string;
}

interface MessageRaw {
  content: string | ContentRaw;
  id: string;
  id1: string;
  id2: string;
  id3: string;
  other: string; // other 字段包含 XML 或其他非 JSON 格式的数据，因此保留为字符串类型
  srvid: number;
  time: string; // 时间通常保留为字符串以保持格式和时区信息
  type: number;
  wxid: string;
}

const HEART_BEAT = 5005 // 心跳
const RECV_TXT_MSG = 1 // 文本消息
const RECV_PIC_MSG = 3 // 图片消息
const SEND_FILE_MSG = 49 // 文件消息
const USER_LIST = 5000 // 微信联系人列表
const GET_USER_LIST_SUCCSESS = 5001 // 获取联系人列表成功
const GET_USER_LIST_FAIL = 5002 // 获取联系人列表失败
const TXT_MSG = 555 // 发送文本消息
const PIC_MSG = 500 // 发送图片消息
const AT_MSG = 550 // 发送AT消息
const CHATROOM_MEMBER = 5010 // 群成员列表
const CHATROOM_MEMBER_NICK = 5020 // 群成员昵称
const PERSONAL_INFO = 6500 // 个人信息
const DEBUG_SWITCH = 6000 // 调试开关
const PERSONAL_DETAIL = 6550 // 个人详细信息
// const DESTROY_ALL = 9999 // 销毁进程
const NEW_FRIEND_REQUEST = 37// 微信好友请求消息
const AGREE_TO_FRIEND_REQUEST = 10000// 同意微信好友请求消息
const ATTATCH_FILE = 5003 // 发送文件

// 检测根目录下是否有msgStore.json文件，如果没有，则创建一个，内容为{}
if (!fs.existsSync('msgStore.json')) {
  fs.writeFileSync('msgStore.json', '{}')
}

const getid = () => {
  const id = Date.now()
  return id.toString()
}

class Bridge extends EventEmitter {

  private wsUrl: string

  private httpUrl: string

  ws: WebSocket

  messageTypeTest: any = {}

  constructor (options?: {
    wsUrl?: string
    httpUrl?:string
  }) {
    super()
    const that = this
    this.wsUrl = options?.wsUrl || 'ws://127.0.0.1:5555'
    this.httpUrl = options?.httpUrl || 'http://127.0.0.1:5555'
    this.ws = new WebSocket(this.wsUrl)

    // 收集消息类型，临时保存到文件'/msgStore.json'
    this.messageTypeTest = JSON.parse(fs.readFileSync('msgStore.json', 'utf-8'))
    this.ws.on('error', (error: Error) => {
      log.error('WebSocket error:', error)
    })
    this.ws.on('open', function open () {
      log.info('WebSocket connection established')
      that.emit('login', 'login')
    })

    this.ws.on('message', function incoming (data: string) {
      log.info('WebSocket received:', data.toString())
      data = data.toString()
      // ws.send("hello world");
      // return;
      const j = JSON.parse(data)
      // log.info(j);
      let type = j.type
      log.info('ws message hook type:', type)
      log.info(JSON.stringify(j, undefined, 2))

      if (j.content && j.content.content) {
        try {
          const content = j.content.content
          // 从content中判断是否存在类似<type>6</type>的格式，并从其中取出type的值
          const m = content.match(/<type>(\d+)<\/type>/)
          if (m != null) {
            type = type + '_' + m[1]
          }
        } catch (e) {
          log.error('ws message hook error:', e)
        }
      }

      if (type === 10000) {
        const list10000 = that.messageTypeTest['10000'] || []
        list10000.push(j)
        that.messageTypeTest[type] = list10000
      } else {
        that.messageTypeTest[type] = j
      }

      try {
        fs.writeFileSync('msgStore.json', JSON.stringify(that.messageTypeTest, undefined, 2))
      } catch (e) {
        log.error('write msgStore.json error:', e)
      }

      switch (type) {
        case CHATROOM_MEMBER_NICK:
          log.info('群成员昵称')
          // handleNickName(j);
          break
        case PERSONAL_DETAIL:
          log.info('个人详细信息')
          break
        case AT_MSG:
          log.info('AT消息')
          break
        case DEBUG_SWITCH:
          log.info('调试开关')
          break
        case PERSONAL_INFO:
          log.info('个人信息')
          break
        case TXT_MSG:
          log.info('文本消息')
          break
        case PIC_MSG:
          log.info('图片消息')
          break
        case CHATROOM_MEMBER:
          log.info('群成员列表')
          break
        case RECV_PIC_MSG:
          log.info('图片消息')
          that.handleReceiveMessage(j)
          break
        case SEND_FILE_MSG:
          log.info('文件消息')
          that.handleReceiveMessage(j)
          break
        case RECV_TXT_MSG:
          log.info('收到文本消息')
          that.handleReceiveMessage(j)
          break
        case HEART_BEAT:
          log.info('心跳')
          that.handleHeartbeat(j)
          break
        case USER_LIST:
          log.info('微信联系人列表')
          break
        case GET_USER_LIST_SUCCSESS:
          log.info('获取联系人列表成功')
          break
        case GET_USER_LIST_FAIL:
          log.info('获取联系人列表失败')
          break
        case NEW_FRIEND_REQUEST:
          log.info('微信好友请求消息')

          // {
          //   content: { content: '"77"邀请"田国发"加入了群聊', id1: '22232811504@chatroom' },
          //   id: '20240121160114',
          //   receiver: 'CLIENT',
          //   sender: 'SERVER',
          //   srvid: 1,
          //   status: 'SUCCSESSED',
          //   time: '2024-01-21 16:01:14',
          //   type: 10000
          // }
          log.info(j)
          break
        case AGREE_TO_FRIEND_REQUEST:
          log.info('系统通知消息')
          break
        // case messageSendText_SUCCSESS:
        // handleReceiveMessage(j);
        // break;
        // case messageSendText_FAIL:
        // handleReceiveMessage(j);
        // break;
        default:
          break
      }
      // log.info(`Roundtrip time: ${Date.now() - data} ms`);

      /* setTimeout(function timeout() {
        ws.send(Date.now());
      }, 500); */
    })
    this.ws.on('close', () => {
      log.info('WebSocket connection closed')
      that.emit('logout', 'logout')
      // reconnect after 1s
      setTimeout(() => {
        this.ws = new WebSocket(this.wsUrl)
      }, 1000)
    })
    this.ws.on('error', (err) => {
      log.info('WebSocket error:', err)
      that.emit('error', err)
    })
  }

  // 处理消息hook
  handleReceiveMessage (j: MessageRaw) {
    this.emit('message', j)
  }

  // 处理心跳消息
  handleHeartbeat (j: any) {
    this.emit('heartbeat', j)
    // log.info(utf16ToUtf8(wxid),utf16ToUtf8(name));
  }

  // 1.获取登录微信信息
  getPersonalInfo () {
    const j = {
      id: getid(),
      type: PERSONAL_INFO,
      content: 'op:personal info',
      wxid: 'ROOT',
    }
    const s = JSON.stringify(j)
    return s
  }

  // 2.发送文本消息
  async messageSendText (wxid: string, content: string) {
    const jpara = {
      id: getid(),
      type: TXT_MSG,
      wxid, // roomid或wxid,必填
      roomid: 'null', // 此处为空
      content,
      nickname: 'null', // 此处为空
      ext: 'null', // 此处为空
      // wxid:'22428457414@chatroom'
    }
    const options
      = {
      // method: 'GET',
      // url: 'https://apis.map.qq.com/ws/district/v1/list',
        url: this.httpUrl + '/api/sendtxtmsg',
        body: {
          para: jpara,
        },
        json: true,
      }
    const res = await axios.post(options.url, options.body)
    const data: ResponseData = res.data
    return data

  }

  // 3.发送@文本
  async messageSendTextAt (roomid: string, wxid: string[], content: string, nickname: string[]) {
    const jpara = {
      id: getid(),
      type: AT_MSG,
      roomid, // not null  23023281066@chatroom
      wxid:wxid[0], // not null
      content, // not null
      nickname: nickname[0],
      ext: 'null',
    }
    const options
      = {
      // method: 'GET',
      // url: 'https://apis.map.qq.com/ws/district/v1/list',
        url: this.httpUrl + '/api/sendatmsg',
        body: {
          para: jpara,
        },
        json: true,
      }
    const res = await axios.post(options.url, options.body)
    const data: ResponseData = res.data

    return data
  }

  // 5.发送图片
  async messageSendPicture (wxid: string, content: string) {
    const jpara = {
      id: getid(),
      type: PIC_MSG,
      wxid,
      roomid: 'null',
      content,
      nickname: 'null',
      ext: 'null',
      // wxid:'22428457414@chatroom'

    }

    const options
      = {
      // method: 'GET',
      // url: 'https://apis.map.qq.com/ws/district/v1/list',
        url: this.httpUrl + '/api/sendpic',
        body: {
          para: jpara,
        },
        json: true,
      }
    const data = await axios.post(options.url, options.body)
    // const j = JSON.parse(data);

    // log.info(j.id);
    // log.info(j.status);
    return data

  }

  // 6.发送文件
  async messageSendFile (wxid: string, content: string) {

    const jpara = {
      id: getid(),
      type: ATTATCH_FILE,
      wxid, // roomid或wxid,必填
      roomid: 'null', // 此处为空
      content, // : 'C:\\tmp\\log.7z'
      nickname: 'null', // 此处为空
      ext: 'null', // 此处为空
      // wxid:'22428457414@chatroom'

    }
    const options
        = {
        // method: 'GET',
        // url: 'https://apis.map.qq.com/ws/district/v1/list',
          url: this.httpUrl + '/api/sendattatch',
          body: {
            para: jpara,
          },
          json: true,

        }
    const res = await axios.post(options.url, options.body)
    const data: ResponseData = res.data
    return data
  }

  // 25.获取群成员
  async getMemberid () {

    const jpara = {
      id: getid(),
      type: CHATROOM_MEMBER,
      wxid: 'null',
      content: 'op:list member',
    }

    const options = {
      url: this.httpUrl + '/api/getmemberid',
      body: {
        para: jpara,
      },
      json: true,
    }
    const data = await axios.post(options.url, options.body)
    // const j = JSON.parse(data);

    // log.info(j.id);
    // log.info(j.status);
    return data
  }

  // 26.获取群成员昵称
  async getMemberNickName (wxid: string, roomid: string) {

    const jpara = {
      id: getid(),
      type: CHATROOM_MEMBER_NICK,
      wxid,
      roomid,
      content: 'null',
      nickname: 'null',
      ext: 'null',
      // wxid:'22428457414@chatroom'

    }
    const options
      = {

        url: this.httpUrl + '/api/getmembernick',
        body: {
          para: jpara,
        },
        json: true,
      }
    const res = await axios.post(options.url, options.body)
    const data: ResponseData = res.data

    // log.info(j.id);
    // log.info(j.status);
    return data
  }

  // 40.转发消息
  async messageForward (wxid: string, msgId: string) {
    console.log('messageForward:', wxid, msgId)
    return 'null'
  }

  // 46.联系人列表
  async getContactList () {
    const jpara = {
      id: getid(),
      type: USER_LIST,
      roomid: 'null', // null
      wxid: 'null', // not null
      content: 'null', // not null
      nickname: 'null',
      ext: 'null',
    }
    const options = {
      url: this.httpUrl + '/api/getcontactlist',
      body: {
        para: jpara,
      },
      json: true,
    }
    const res = await axios.post(options.url, options.body)
    const contacts: ContactRaw[] = res.data.content
    // log.info('getContactList len:', contacts.length)
    return contacts
  }

  // 47.获取群详情
  async getRoomList () {
    const jpara = {
      id: getid(),
      type: CHATROOM_MEMBER,
      roomid: 'null', // null
      wxid: 'null', // not null
      content: 'null', // not null
      nickname: 'null',
      ext: 'null',
    }
    const options = {
      url: this.httpUrl + '/api/get_charroom_member_list', //
      body: {
        para: jpara,
      },
      json: true,
    }
    const res = await axios.post(options.url, options.body)
    const rooms: RoomRaw[] = res.data.content
    return rooms

  }

}

export { Bridge }

export type {
  ContactRaw,
  RoomRaw,
  ResponseData,
  MessageRaw,
  ContentRaw,
}

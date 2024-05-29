# Wechaty Puppet Bridge

<img alt="GitHub stars badge" src="https://img.shields.io/github/stars/atorber/puppet-bridge"> <img alt="GitHub forks badge" src="https://img.shields.io/github/forks/atorber/puppet-bridge"> [![NPM](https://github.com/atorber/puppet-bridge/workflows/NPM/badge.svg)](https://github.com/atorber/puppet-bridge/actions?query=workflow%3ANPM)
[![NPM Version](https://img.shields.io/npm/v/wechaty-puppet-bridge?color=brightgreen)](https://www.npmjs.com/package/wechaty-puppet-bridge)
[![npm (tag)](https://img.shields.io/npm/v/wechaty-puppet-bridge/next.svg)](https://www.npmjs.com/package/wechaty-puppet-bridge?activeTab=versions) ![npm downloads](https://img.shields.io/npm/dm/wechaty-puppet-bridge.svg)

<img src="./docs/images/core.png" alt="chatie puppet bridge" height="350" align="bottom" />

## 简介

wechaty-puppet-bridge 是一个虚拟的Wechaty Puppet，实际上它只是一个桥接服务，它将GitHub中开源的机器人桥接到Wechaty，是开源IM bot搬运工

如果你想方便且高效的使用免费的机器人，那么它是一个很好的选择，它不需要token同时又能使用Wechaty进行聊天机器人开发

与wechaty-puppet-xp比较：

| 项目 | [puppet-xp](https://github.com/atorber/puppet-xp) | [puppet-bridge](https://github.com/atorber/puppet-bridge) |
| :------------- |:-------------| :-----|
| 手动注入 | ⭐⭐⭐<br>不需要 | ⭐⭐⭐<br>不需要 |
| 功能| ⭐⭐⭐<br>基于[cixingguangming55555/wechat-bot](https://github.com/cixingguangming55555/wechat-bot)项目 | ⭐⭐⭐<br>基于[cixingguangming55555/wechat-bot](https://github.com/cixingguangming55555/wechat-bot)、[jwping/wxbot](https://github.com/jwping/wxbot)、[ttttupup/wxhelper](https://github.com/ttttupup/wxhelper)等开源项目 |
| 梯子 | ⭐<br>依赖frida，国内网络无法安装，需使用梯子 | ⭐⭐⭐<br>不需要，直接运行程序即可 |
| 启动| ⭐⭐⭐<br>直接运行nodejs程序 | ⭐⭐<br>需先手动启动确认启动，但很简单|
| 环境| ⭐⭐⭐<br>nodejs | ⭐⭐<br>nodejs|

获取更多信息[访问项目语雀文档](https://www.yuque.com/atorber/chatflow/mean34ibdoonvox4)

## 功能清单

wechaty-puppet-bridge 是一个全新的wechaty-puppet，它可以连接所有的通过ws、http、mqtt开放IM访问的聊天机器人.

> 最新功能清单查看[功能清单](https://www.yuque.com/atorber/chatflow/imovlh1l8ypxmd9n#eTg6)

![功能清单](./docs/images/fnlist.png)

## 机器人支持

1. Wechat-bot 馈人玫瑰之手，历久犹有余香 [cixingguangming55555/wechat-bot](https://github.com/cixingguangming55555/wechat-bot)

2. wxbot - 聊天机器人 [jwping/wxbot](https://github.com/jwping/wxbot)

3. wxhelper - PC端微信逆向学习 [ttttupup/wxhelper](https://github.com/ttttupup/wxhelper)

## 快速开始

### 使用[cixingguangming55555/wechat-bot](https://github.com/cixingguangming55555/wechat-bot)

1. 在您的Windows电脑上安装客户端（需要版本v3.9.2.23,下载[v3.9.2.23](https://github.com/tom-snow/wechat-windows-versions/releases/tag/v3.9.2.23)）

2. 在电脑上登录客户端

3. 运行以下指令启动程序,程序启动时会自动打开注入程序，运行程序并点击【Start】开启功能。

  ```sh
  git clone https://github.com/atorber/puppet-bridg
  cd puppet-bridge

  # 安装依赖
  npm install

  # 启动程序
  npm start
  #
  # Do not forget to install WeChat with requried version and login.
  #
  ```

   ![image](https://github.com/atorber/puppet-bridge/assets/19552906/c2c86ff8-8a48-439f-a48a-6830883693d2)

### 使用[jwping/wxbot](https://github.com/jwping/wxbot)

1. 在您的Windows电脑上安装客户端（需要版本v3.9.8.25,下载[v3.9.8.25](https://github.com/tom-snow/wechat-windows-versions/releases/tag/v3.9.8.25)）

2. 在电脑上登录客户端

3. 运行以下指令启动程序

```sh
git clone https://github.com/atorber/puppet-bridg
cd puppet-bridge

# 安装依赖
npm install

# 启动程序
npm run start:ripe-bridge-jwping-wxbot:info
#
# Do not forget to install WeChat with requried version and login.
#
```

## 使用NPM包

puppet-bridge 已经在NPM上发布了安装包，Wechaty用户可以直接安装使用

```shell
npm i wechaty-puppet-bridge
```

示例代码：

- 运行在[cixingguangming55555/wechat-bot](https://github.com/cixingguangming55555/wechat-bot)上的v3.9.2.23

```typescript
import {
    WechatyBuilder,
    log,
  } from 'wechaty'
  import { FileBox } from 'file-box'
  import {PuppetBridgeCixingguangming55555WechatBotV3090223 as PuppetBridge } from 'wechaty-puppet-bridge'
  
  async function onLogin (user) {
    log.info('onLogin', '%s login', user)
    const roomList = await bot.Room.findAll()
    console.info('room count:', roomList.length)
    const contactList = await bot.Contact.findAll()
    console.info('contact count:', contactList.length)
  }
  
  async function onMessage (message) {
    log.info('onMessage', JSON.stringify(message))
  
    // 1. send Image
    if (/^ding$/i.test(message.text())) {
      const fileBox = FileBox.fromUrl('https://wechaty.github.io/wechaty/images/bot-qr-code.png')
      await message.say(fileBox)
    }
  
    // 2. send Text
  
    if (/^dong$/i.test(message.text())) {
      await message.say('dingdingding')
    }
  
  }
  
  const puppet = new PuppetBridge({
   token: '大师'  // 当前登录账号的昵称作为token
   })

  const bot = WechatyBuilder.build({
    name: 'ding-dong-bot',
    puppet,
  })
  
  bot.on('login', onLogin)
  bot.on('message', onMessage)
  
  bot.start()
    .then(() => {
      return log.info('StarterBot', 'Starter Bot Started.')
    })
    .catch(console.error)
```

- 运行在[jwping/wxbot](https://github.com/jwping/wxbot)上的v3.9.8.25

```typescript
import {
    WechatyBuilder,
    log,
  } from 'wechaty'
  import { FileBox } from 'file-box'
  import { PuppetBridgeJwpingWxbotV3090825 as PuppetBridge } from 'wechaty-puppet-bridge'

  async function onLogin (user) {
    log.info('onLogin', '%s login', user)
    const roomList = await bot.Room.findAll()
    console.info('room count:', roomList.length)
    const contactList = await bot.Contact.findAll()
    console.info('contact count:', contactList.length)
  }
  
  async function onMessage (message) {
    log.info('onMessage', JSON.stringify(message))
  
    // 1. send Image
    if (/^ding$/i.test(message.text())) {
      const fileBox = FileBox.fromUrl('https://wechaty.github.io/wechaty/images/bot-qr-code.png')
      await message.say(fileBox)
    }
  
    // 2. send Text
  
    if (/^dong$/i.test(message.text())) {
      await message.say('dingdingding')
    }
  
  }
  
  const puppet = new PuppetBridge()

  const bot = WechatyBuilder.build({
    name: 'ding-dong-bot',
    puppet,
  })
  
  bot.on('login', onLogin)
  bot.on('message', onMessage)
  
  bot.start()
    .then(() => {
      return log.info('StarterBot', 'Starter Bot Started.')
    })
    .catch(console.error)
```

- 运行在[ttttupup/wxhelper](https://github.com/ttttupup/wxhelper/tree/dev-3.9.8.25)上的v3.9.8.25

> 需要【以管理员身份运行】WeChat客户端

```typescript
import {
    WechatyBuilder,
    log,
  } from 'wechaty'
  import { FileBox } from 'file-box'
  import { PuppetBridgeAtorberFusedV3090825 as PuppetBridge } from 'wechaty-puppet-bridge'

  async function onLogin (user) {
    log.info('onLogin', '%s login', user)
    const roomList = await bot.Room.findAll()
    console.info('room count:', roomList.length)
    const contactList = await bot.Contact.findAll()
    console.info('contact count:', contactList.length)
  }
  
  async function onMessage (message) {
    log.info('onMessage', JSON.stringify(message))
  
    // 1. send Image
    if (/^ding$/i.test(message.text())) {
      const fileBox = FileBox.fromUrl('https://wechaty.github.io/wechaty/images/bot-qr-code.png')
      await message.say(fileBox)
    }
  
    // 2. send Text
  
    if (/^dong$/i.test(message.text())) {
      await message.say('dingdingding')
    }
  
  }
  
  const puppet = new PuppetBridge()

  const bot = WechatyBuilder.build({
    name: 'ding-dong-bot',
    puppet,
  })
  
  bot.on('login', onLogin)
  bot.on('message', onMessage)
  
  bot.start()
    .then(() => {
      return log.info('StarterBot', 'Starter Bot Started.')
    })
    .catch(console.error)
```

- 运行在[ttttupup/wxhelper](https://github.com/ttttupup/wxhelper/tree/dev-3.9.5.81)上的v3.9.5.81

> 需要【以管理员身份运行】WeChat客户端

```typescript
import {
    WechatyBuilder,
    log,
  } from 'wechaty'
  import { FileBox } from 'file-box'
  import { PuppetBridgeTtttupupWxhelperV3090581 as PuppetBridge } from 'wechaty-puppet-bridge'

  async function onLogin (user) {
    log.info('onLogin', '%s login', user)
    const roomList = await bot.Room.findAll()
    console.info('room count:', roomList.length)
    const contactList = await bot.Contact.findAll()
    console.info('contact count:', contactList.length)
  }
  
  async function onMessage (message) {
    log.info('onMessage', JSON.stringify(message))
  
    // 1. send Image
    if (/^ding$/i.test(message.text())) {
      const fileBox = FileBox.fromUrl('https://wechaty.github.io/wechaty/images/bot-qr-code.png')
      await message.say(fileBox)
    }
  
    // 2. send Text
  
    if (/^dong$/i.test(message.text())) {
      await message.say('dingdingding')
    }
  
  }
  
  const puppet = new PuppetBridge()

  const bot = WechatyBuilder.build({
    name: 'ding-dong-bot',
    puppet,
  })
  
  bot.on('login', onLogin)
  bot.on('message', onMessage)
  
  bot.start()
    .then(() => {
      return log.info('StarterBot', 'Starter Bot Started.')
    })
    .catch(console.error)
```

- 运行在[ttttupup/wxhelper](https://github.com/ttttupup/wxhelper/tree/dev-3.9.10.19)上的v3.9.10.19

> 需要【以管理员身份运行】WeChat客户端

```typescript
import {
  Contact,
  Message,
  ScanStatus,
  WechatyBuilder,
  log,
  types,
} from 'wechaty'
import { FileBox } from 'file-box'

import { PuppetBridgeTtttupupWxhelperV3091019 as PuppetBridge } from 'wechaty-puppet-bridge'
import qrcodeTerminal from 'qrcode-terminal'
import * as fs from 'fs'

// 初始化检查当前文件加下是否存在日志文件info.log，如果不存在则创建
const logPath = 'info.log'
if (!fs.existsSync(logPath)) {
  fs.writeFileSync(logPath, '')
}

// 定义写日志的方法
export function writeLog (info: string) {
  fs.appendFileSync(logPath, info + '\n')
}

function onScan (qrcode: string, status: ScanStatus) {
  if (qrcode) {
    const qrcodeImageUrl = [
      'https://wechaty.js.org/qrcode/',
      encodeURIComponent(qrcode),
    ].join('')
    log.info('onScan', '%s(%s) - %s', status, qrcodeImageUrl)

    qrcodeTerminal.generate(qrcode, { small: true })  // show qrcode on console
    log.info(`[${status}] ${qrcode}\nScan QR Code above to log in: `)
  } else {
    log.info(`[${status}]`)
  }
}

async function onLogin (user: Contact) {
  log.info('ripe onLogin event:', JSON.stringify(user))
}

function onLogout (user: Contact) {
  log.info('onLogout', '%s logout', user)
}

async function onMessage (msg: Message) {
  // log.info('onMessage', msg.toString())
  log.info('onMessage接收到消息：', JSON.stringify(msg, null, 2))
  const contact = msg.talker()
  log.info('当前联系人信息：', JSON.stringify(contact))
  const room = msg.room()
  let sendRes:any = ''
  if (room) {
    log.info('当前群名称：', await room.topic())
    log.info('当前群ID：', room.id)
    const owner = await room.owner()
    log.info('当前群群主：', JSON.stringify(owner) || 'undefined')
    log.info('当前群群主昵称：', owner && owner.name())
  }

  if (msg.text() === 'ding') {
    sendRes = await msg.say(new Date().toLocaleString() + ' dong')
    log.info('发送消息结果：', sendRes || 'undefined')
  }

  const basepath = 'examples/media/'
  /**
   * 发送文件
   */
  if (msg.text() === 'txt') {
    const newpath = basepath + 'test.txt'
    const fileBox = FileBox.fromFile(newpath)
    sendRes = await msg.say(fileBox)
    log.info('发送消息结果：', sendRes)
  }

  /**
   * 发送图片
   */
  if (msg.text() === 'jpg') {
    const newpath = 'https://bce.bdstatic.com/doc/IOTSTACK/IoTPlatform/0-0-1_abfce11.png'
    const fileBox = FileBox.fromUrl(newpath)
    sendRes = await msg.say(fileBox)
    log.info('发送消息结果：', sendRes)
  }

  /**
   * 发送本地图片
   */
  if (msg.text() === 'jpg_local') {
    const newpath = basepath + 'logo.jpg'
    const fileBox = FileBox.fromFile(newpath)
    sendRes = await msg.say(fileBox)
    log.info('发送消息结果：', sendRes)
  }

  /**
   * 发送表情
   */
  if (msg.text() === 'gif') {
    const newpath = basepath + 'test.gif'
    const fileBox = FileBox.fromFile(newpath)
    sendRes = await msg.say(fileBox)
    log.info('发送消息结果：', sendRes)
  }

  /**
   * 发送视频
   */
  if (msg.text() === 'mp4') {
    const newpath = basepath + 'test.mp4'
    const fileBox = FileBox.fromFile(newpath)
    sendRes = await msg.say(fileBox)
    log.info('发送消息结果：', sendRes)
  }

  let filePath = 'file/'
  // 检查文件夹是否存在，不存在则创建
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath)
  }

  try {
    if (msg.type() === types.Message.Image || msg.type() === types.Message.Attachment || msg.type() === types.Message.Video || msg.type() === types.Message.Audio || msg.type() === types.Message.Emoticon) {

      let file

      if (msg.type() === types.Message.Image) {
        file = await msg.toImage().thumbnail()  // Save the media message as a FileBox
      } else {
        file = await msg.toFileBox()  // Save the media message as a FileBox
      }
      filePath = filePath + file.name
      try {
        await file.toFile(filePath, true)
        log.info(`Saved file: ${filePath}`)
      } catch (e) {
        log.error('保存文件错误：', e)
      }
    } else {
      // Log other non-text messages
      const logData = {
        date: new Date(),
        listener: msg.listener(),
        room:await msg.room(),
        talker: msg.talker(),
        text: msg.text(),
        type: msg.type(),
      }

      const logPath = filePath + 'message.log'
      fs.appendFileSync(logPath, JSON.stringify(logData, null, 2) + '\n')

      log.info(`日志查看路径： ${logPath}`)
    }
  } catch (e) {
    log.error(`Error handling message: ${e}`)
  }

}

const onReady = async () => {
  log.info('bot已经准备好了')
  // const roomList = await bot.Room.findAll()
  // writeLog('群信息：' + JSON.stringify(roomList))
  // log.info('群数量：', roomList.length)
  // const contactList = await bot.Contact.findAll()
  // writeLog('联系人信息：' + JSON.stringify(contactList))
  // log.info('联系人数量：', contactList.length)
  // const friends = contactList.filter(c => c.friend())
  // log.info('好友数量：', friends.length)
  // 发送@好友消息
  const room = await bot.Room.find({ topic:'大师是群主' })
  log.info('room：', room)

  const contact = await bot.Contact.find({ name:'luyuchao' })
  log.info('contact', contact)

  // if (room && contact) {
  //   const contacts:Contact[] = [ contact ]
  //   const msg = `${new Date().toLocaleString()}${bot.currentUser.name()}上线了！`
  //   await contact.say(msg)
  //   await room.say(msg, ...contacts)
  // }

}

const puppet = new PuppetBridge()
const bot = WechatyBuilder.build({
  name: 'ding-dong-bot',
  puppet,
})

bot.on('scan', onScan)
bot.on('login', onLogin)
bot.on('ready', onReady)
bot.on('logout', onLogout)
bot.on('message', onMessage)
bot.on('room-join', async (room, inviteeList, inviter) => {
  const nameList = inviteeList.map(c => c.name()).join(',')
  log.info(`Room ${await room.topic()} got new member ${nameList}, invited by ${inviter}`)
})
bot.on('room-leave', async (room, leaverList, remover) => {
  const nameList = leaverList.map(c => c.name()).join(',')
  log.info(`Room ${await room.topic()} lost member ${nameList}, the remover is: ${remover}`)
})
bot.on('room-topic', async (room, topic, oldTopic, changer) => {
  log.info(`Room ${await room.topic()} topic changed from ${oldTopic} to ${topic} by ${changer.name()}`)
})
bot.on('room-invite', async roomInvitation => {
  log.info(JSON.stringify(roomInvitation))
  try {
    log.info('received room-invite event.')
    await roomInvitation.accept()
  } catch (e) {
    log.error('处理进群申请信息错误：', e)
  }
})

bot.start()
  .then(() => {
    return log.info('ripe', 'Bot Started.')
  })
  .catch(log.error)
```

- 运行在[ttttupup/wxhelper](https://github.com/ttttupup/wxhelper/tree/dev-3.9.8.25)上的v3.9.8.25

> 需要【以管理员身份运行】WeChat客户端

```typescript
import {
  Contact,
  Message,
  ScanStatus,
  WechatyBuilder,
  log,
  types,
} from 'wechaty'
import { FileBox } from 'file-box'

import { PuppetBridgeAtorberFusedV3090825 as PuppetBridge } from 'wechaty-puppet-bridge'
import qrcodeTerminal from 'qrcode-terminal'
import * as fs from 'fs'

// 初始化检查当前文件加下是否存在日志文件info.log，如果不存在则创建
const logPath = 'info.log'
if (!fs.existsSync(logPath)) {
  fs.writeFileSync(logPath, '')
}

// 定义写日志的方法
export function writeLog (info: string) {
  fs.appendFileSync(logPath, info + '\n')
}

function onScan (qrcode: string, status: ScanStatus) {
  if (qrcode) {
    const qrcodeImageUrl = [
      'https://wechaty.js.org/qrcode/',
      encodeURIComponent(qrcode),
    ].join('')
    log.info('onScan', '%s(%s) - %s', status, qrcodeImageUrl)

    qrcodeTerminal.generate(qrcode, { small: true })  // show qrcode on console
    log.info(`[${status}] ${qrcode}\nScan QR Code above to log in: `)
  } else {
    log.info(`[${status}]`)
  }
}

async function onLogin (user: Contact) {
  log.info('ripe onLogin event:', JSON.stringify(user))
}

function onLogout (user: Contact) {
  log.info('onLogout', '%s logout', user)
}

async function onMessage (msg: Message) {
  // log.info('onMessage', msg.toString())
  log.info('onMessage接收到消息：', JSON.stringify(msg, null, 2))
  const contact = msg.talker()
  log.info('当前联系人信息：', JSON.stringify(contact))
  const room = msg.room()
  let sendRes:any = ''
  if (room) {
    log.info('当前群名称：', await room.topic())
    log.info('当前群ID：', room.id)
    const owner = await room.owner()
    log.info('当前群群主：', JSON.stringify(owner) || 'undefined')
    log.info('当前群群主昵称：', owner && owner.name())
  }

  if (msg.text() === 'ding') {
    sendRes = await msg.say(new Date().toLocaleString() + ' dong')
    log.info('发送消息结果：', sendRes || 'undefined')
  }

  const basepath = 'examples/media/'
  /**
   * 发送文件
   */
  if (msg.text() === 'txt') {
    const newpath = basepath + 'test.txt'
    const fileBox = FileBox.fromFile(newpath)
    sendRes = await msg.say(fileBox)
    log.info('发送消息结果：', sendRes)
  }

  /**
   * 发送图片
   */
  if (msg.text() === 'jpg') {
    const newpath = 'https://bce.bdstatic.com/doc/IOTSTACK/IoTPlatform/0-0-1_abfce11.png'
    const fileBox = FileBox.fromUrl(newpath)
    sendRes = await msg.say(fileBox)
    log.info('发送消息结果：', sendRes)
  }

  /**
   * 发送本地图片
   */
  if (msg.text() === 'jpg_local') {
    const newpath = basepath + 'logo.jpg'
    const fileBox = FileBox.fromFile(newpath)
    sendRes = await msg.say(fileBox)
    log.info('发送消息结果：', sendRes)
  }

  /**
   * 发送表情
   */
  if (msg.text() === 'gif') {
    const newpath = basepath + 'test.gif'
    const fileBox = FileBox.fromFile(newpath)
    sendRes = await msg.say(fileBox)
    log.info('发送消息结果：', sendRes)
  }

  /**
   * 发送视频
   */
  if (msg.text() === 'mp4') {
    const newpath = basepath + 'test.mp4'
    const fileBox = FileBox.fromFile(newpath)
    sendRes = await msg.say(fileBox)
    log.info('发送消息结果：', sendRes)
  }

  let filePath = 'file/'
  // 检查文件夹是否存在，不存在则创建
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath)
  }

  try {
    if (msg.type() === types.Message.Image || msg.type() === types.Message.Attachment || msg.type() === types.Message.Video || msg.type() === types.Message.Audio || msg.type() === types.Message.Emoticon) {

      let file

      if (msg.type() === types.Message.Image) {
        file = await msg.toImage().thumbnail()  // Save the media message as a FileBox
      } else {
        file = await msg.toFileBox()  // Save the media message as a FileBox
      }
      filePath = filePath + file.name
      try {
        await file.toFile(filePath, true)
        log.info(`Saved file: ${filePath}`)
      } catch (e) {
        log.error('保存文件错误：', e)
      }
    } else {
      // Log other non-text messages
      const logData = {
        date: new Date(),
        listener: msg.listener(),
        room:await msg.room(),
        talker: msg.talker(),
        text: msg.text(),
        type: msg.type(),
      }

      const logPath = filePath + 'message.log'
      fs.appendFileSync(logPath, JSON.stringify(logData, null, 2) + '\n')

      log.info(`日志查看路径： ${logPath}`)
    }
  } catch (e) {
    log.error(`Error handling message: ${e}`)
  }

}

const onReady = async () => {
  log.info('bot已经准备好了')
  // const roomList = await bot.Room.findAll()
  // writeLog('群信息：' + JSON.stringify(roomList))
  // log.info('群数量：', roomList.length)
  // const contactList = await bot.Contact.findAll()
  // writeLog('联系人信息：' + JSON.stringify(contactList))
  // log.info('联系人数量：', contactList.length)
  // const friends = contactList.filter(c => c.friend())
  // log.info('好友数量：', friends.length)
  // 发送@好友消息
  const room = await bot.Room.find({ topic:'大师是群主' })
  log.info('room：', room)

  const contact = await bot.Contact.find({ name:'luyuchao' })
  log.info('contact', contact)

  // if (room && contact) {
  //   const contacts:Contact[] = [ contact ]
  //   const msg = `${new Date().toLocaleString()}${bot.currentUser.name()}上线了！`
  //   await contact.say(msg)
  //   await room.say(msg, ...contacts)
  // }

}

const puppet = new PuppetBridge()
const bot = WechatyBuilder.build({
  name: 'ding-dong-bot',
  puppet,
})

bot.on('scan', onScan)
bot.on('login', onLogin)
bot.on('ready', onReady)
bot.on('logout', onLogout)
bot.on('message', onMessage)
bot.on('room-join', async (room, inviteeList, inviter) => {
  const nameList = inviteeList.map(c => c.name()).join(',')
  log.info(`Room ${await room.topic()} got new member ${nameList}, invited by ${inviter}`)
})
bot.on('room-leave', async (room, leaverList, remover) => {
  const nameList = leaverList.map(c => c.name()).join(',')
  log.info(`Room ${await room.topic()} lost member ${nameList}, the remover is: ${remover}`)
})
bot.on('room-topic', async (room, topic, oldTopic, changer) => {
  log.info(`Room ${await room.topic()} topic changed from ${oldTopic} to ${topic} by ${changer.name()}`)
})
bot.on('room-invite', async roomInvitation => {
  log.info(JSON.stringify(roomInvitation))
  try {
    log.info('received room-invite event.')
    await roomInvitation.accept()
  } catch (e) {
    log.error('处理进群申请信息错误：', e)
  }
})

bot.start()
  .then(() => {
    return log.info('ripe', 'Bot Started.')
  })
  .catch(log.error)

```

## 更新日志

### v0.12.0

- 增加wxhelper-3.9.10.19-v1.dll支持

### v0.11.0

- 增加wxhelper-3.9.2.23-v9.dll支持（部分接口暂未适配）

### v0.10.4

- 修复wxbot无法发送图片bug

### v0.10.3

- 修复注入文件路径错误问题

### v0.10.1

- 支持接收图片（注意当前的实现方式可能存在并发接收图片消息时接收不到或图片与消息不匹配的情况）

### v0.10.0

- PuppetBridgeAtorberFusedV3090825支持[@all](https://www.yuque.com/atorber/chatflow/dnq7miho2gkfnmvk#l5ukp),使用方法room.say('Hi~', ...[SelfContact])
- PuppetBridgeAtorberFusedV3090825支持[发送多个不同的@消息](https://www.yuque.com/atorber/chatflow/dnq7miho2gkfnmvk#keK3C)，使用方法room.say('{"chatRoomId":"xxxx","at":[{"wxid":"wxid_xxx","msg":"@xxx"}]}')

### v0.9.0

- 修复npm包无法找到注入工具的问题

### v0.8.10

- 增加contactPayloadDirty更新联系人缓存

### v0.8.9

- 修复部分群成员查询失败导致无法出发登录事件的问题

### v0.8.8

- 修复__dirname重复定义的问题

### v0.8.7

- wxhelper类抽离，支持指定httpUrl
- fused类抽离，支持指定httpUrl

### v0.8.2

- 优化注入逻辑，当设置了httpUrl时，不自动注入，默认为已完成手动注入
- 当http服务已存在时不重复注入

### v0.7.0

- 升级atorber-fused仅需要[ttttupup/wxhelper](https://github.com/ttttupup/wxhelper)启动
- 拓展[ttttupup/wxhelper](https://github.com/ttttupup/wxhelper)使用32.获取数据库句柄拓展支持：
  - 47.获取群详情
  - 25.获取群成员
  - 60.获取群/群成员详情
- 支持自动注入及自动登录

### v0.6.1

- 新增atorber-fused融合brisge，集合[jwping/wxbot](https://github.com/jwping/wxbot)和 [ttttupup/wxhelper](https://github.com/ttttupup/wxhelper)两个项目的3.9.8.25版本的功能合集
- 支持自动注入及自动登录

### v0.6.0

- 适配 [ttttupup/wxhelper](https://github.com/ttttupup/wxhelper),支持v3.9.5.81版本，功能最全的免费机器人
- 自动注入

### v0.4.0 (2023-2-1)

适配 [jwping/wxbot](https://github.com/jwping/wxbot) 项目，支持v3.9.8.25版本

### v0.1.0 (2023-1-21)

初始化版本，适配 [cixingguangming55555/wechat-bot](https://github.com/cixingguangming55555/wechat-bot) 项目，支持v3.9.2.23版本

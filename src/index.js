import less from './index.less'

//+
document.querySelector('.button').addEventListener('click', () => document.querySelector('.file').click())

//判断上传是否完成
const isOK = () => document.querySelector('progress').value === 100

//按钮切换
const uploading = () => {
    document.querySelector('.uploading').style.display = 'block'
    document.querySelector('.ok').style.display = 'none'
}

const ok = () => {
    document.querySelector('.uploading').style.display = 'none'
    document.querySelector('.ok').style.display = 'block'
}
document.querySelector('.ok').addEventListener('click', () => {
    document.querySelector('footer').style.display = 'none'
    document.querySelector('.progress').value = 0
})


const toggle = () => isOK() ? ok() : uploading()

toggle()

//ajax
let file = document.querySelector('.file')

file.addEventListener('change', () => upload())

const upload = () => {
    if (file.files[0]) {
        let formData = new FormData()
        formData.append('img', file.files[0])

        let xhr = new XMLHttpRequest()

        xhr.onreadystatechange = () => {
            if (xhr.status === 200 && xhr.readyState === 4) {
                showFooter()
            }
        }

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {　　　　　　
                var complete = (event.loaded / event.total * 100 | 0);　　　　　　
                var progress = document.querySelector('.progress');　　　　　　
                setTimeout(() => {
                    progress.value = complete
                    toggle()
                }, 1000)

            }
        }

        xhr.open('post', 'http://127.0.0.1:8080/upload', true)
        xhr.send(formData)
    }
}

const showFooter = () => {
    document.querySelector('footer').style.display = 'flex'
    toggle()
}

//拖放图片
let main = document.querySelector('main')

main.ondrop = (event) => {
    event.preventDefault()
    file.files = event.dataTransfer.files
    main.style.background = 'rgba(0,0,0,.2)'
}

main.ondragover = () => {
    main.style.background = 'rgba(0,0,0,.6)'
    return false
}

main.ondragend = () => false
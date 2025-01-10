const ShellSpawn = require('./lib/ShellSpawn')
const ShellExec = require('./lib/ShellExec')
const GetFiles = require('./lib/GetFiles')

const path = require('path')
const fs = require('fs')

const isColab = require('./lib/isColab')

let main = async function () {

  if (isColab) {
    await ShellSpawn(`rm -rf /output/*`)
  }

  let files = GetFiles()
  for (let i = 0; i < files.length; i++) {
    let file = files[i]
    
    let filename = path.basename(file)
    // let dirname = path.dirname(file)
    let filenameNoExt = path.parse(filename).name
    let ext = path.extname(filename)
    if (ext === '.md' || ext === '.txt' || ext === '.html' || ext === '.htm') {
      continue
    }

    let fileTmp = `/tmp/input`
    if (fs.existsSync(fileTmp)) {
      fs.unlinkSync(fileTmp)
    }
    await ShellExec(`cp "${file}" ${fileTmp}`)

    let fileOutputTmp = `/tmp/output`
    if (fs.existsSync(fileOutputTmp)) {
      fs.unlinkSync(fileOutputTmp)
    }
    await ShellExec(`/usr/bin/markitdown "${fileTmp}" > ${fileOutputTmp}`)

    let fileOutput = '/output/' + filenameNoExt + '.md'
    await ShellExec(`cp "${fileOutputTmp}" "${fileOutput}"`)
  }
}

main()
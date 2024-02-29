'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input ,message  ,Spin  } from 'antd'
interface FileDetails extends Blob {
  lastModified: number
  lastModifiedDate: Date
  name: string
  size: number
  type: string
  webkitRelativePath: string
}

export default function UploadButton({file ,setFile}:any) {
  const [selectedFile, setSelectedFile] = useState<FileDetails>()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const options = {
    cMapUrl: 'cmaps/',
    standardFontDataUrl: 'standard_fonts/',
  }
  const handleFileSelect = (event: any) => {
    const file = event.target.files[0]
    setSelectedFile(file)
    handleFileUpload(file)
  }

  const handleFileUpload = useCallback(
    (file: FileDetails) => {
      if (!file) {
        message.success("Please select file first")
        return
      }
      setLoading(true)
      const data = new FormData()
      data.append('file', file, file.name)
      fetch('/api/admin/upload', {
        method: 'POST',
        body: data,
      }).then((response) => {
        response.json().then((data) => {
          console.log(data)
          setFile(data)
          message.success("Pdf folder uploaded Successfully")
         // router.push(`/view/${data.id}`)
        })
        setLoading(false)
      })
    },
    [router]
  )

//   useEffect(() => {
//     if (selectedFile) {
//       handleFileUpload(selectedFile)
//     }
//   }, [handleFileUpload, selectedFile])

  return (
    <div className='!border-2     rounded-md text-lg  text-white text-center !py-2 !px-4 !border'>


{loading ?

<Spin/>


:


<label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Add Pdf</div>
          <input type="file" onChange={handleFileSelect} className="!hidden" />
        </label>

}




    </div>
  )
}

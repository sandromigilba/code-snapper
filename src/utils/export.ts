import { toPng, toJpeg, toSvg, toBlob } from 'html-to-image'
import { jsPDF } from 'jspdf'
import { showToast } from '../store/useToastStore'
import { useSnapStore } from '../store/useSnapStore'

type ExportFormat = 'png' | 'jpg' | 'svg' | 'pdf'
type ExportResolution = 1 | 2 | 4

interface ExportOptions {
  nodeId: string
  format: ExportFormat
  resolution: ExportResolution
  filename: string
}

export const exportSnap = async ({
  nodeId,
  format,
  resolution,
  filename,
}: ExportOptions): Promise<void> => {
  const node = document.getElementById(nodeId)
  if (!node) {
    showToast.error('Code snap canvas not found.')
    return
  }

  const store = useSnapStore.getState()
  // Set cursor to wait and progress
  document.body.style.cursor = 'wait'
  store.setIsExporting(true, 10)

  // Create formatted filename
  const cleanFilename = filename.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_')
  const finalFilename = `${cleanFilename || 'untitled_snap'}_${resolution}x`

  try {
    showToast.info('Rendering snap, please wait...')
    store.setIsExporting(true, 30)
    
    // Common options for html-to-image
    const imageOptions = {
      pixelRatio: resolution,
      cacheBust: true,
      skipFonts: true,
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left',
      },
    }

    store.setIsExporting(true, 55)

    if (format === 'png') {
      const dataUrl = await toPng(node, imageOptions)
      store.setIsExporting(true, 80)
      downloadFile(dataUrl, `${finalFilename}.png`)
      store.setIsExporting(true, 100)
      showToast.success('PNG exported successfully!')
    } 
    else if (format === 'jpg') {
      const dataUrl = await toJpeg(node, { ...imageOptions, quality: 0.95 })
      store.setIsExporting(true, 80)
      downloadFile(dataUrl, `${finalFilename}.jpg`)
      store.setIsExporting(true, 100)
      showToast.success('JPG exported successfully!')
    } 
    else if (format === 'svg') {
      const dataUrl = await toSvg(node, imageOptions)
      store.setIsExporting(true, 80)
      downloadFile(dataUrl, `${finalFilename}.svg`)
      store.setIsExporting(true, 100)
      showToast.success('SVG exported successfully!')
    } 
    else if (format === 'pdf') {
      // Get dimensions of element
      const rect = node.getBoundingClientRect()
      const width = rect.width
      const height = rect.height

      // Render as PNG first
      const dataUrl = await toPng(node, imageOptions)
      store.setIsExporting(true, 75)

      // Create PDF matching dimensions exactly
      const pdf = new jsPDF({
        orientation: width > height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [width, height],
      })

      store.setIsExporting(true, 90)
      pdf.addImage(dataUrl, 'PNG', 0, 0, width, height)
      pdf.save(`${finalFilename}.pdf`)
      store.setIsExporting(true, 100)
      showToast.success('PDF exported successfully!')
    }
  } catch (error) {
    console.error('Export error:', error)
    showToast.error('Failed to export. Try a lower resolution or simpler settings.')
  } finally {
    // Restore cursor and delay resetting state to let the user see it complete
    document.body.style.cursor = ''
    setTimeout(() => {
      useSnapStore.getState().setIsExporting(false, 0)
    }, 400)
  }
}

// Copy png image to clipboard
export const copyToClipboard = async (nodeId: string): Promise<boolean> => {
  const node = document.getElementById(nodeId)
  if (!node) {
    showToast.error('Code snap canvas not found.')
    return false
  }

  const store = useSnapStore.getState()
  // Set cursor to wait and progress
  document.body.style.cursor = 'wait'
  store.setIsExporting(true, 15)

  try {
    showToast.info('Preparing image for clipboard...')
    store.setIsExporting(true, 45)
    
    // Render at 2x for best clipboard sharpness
    const blob = await toBlob(node, {
      pixelRatio: 2,
      cacheBust: true,
      skipFonts: true,
    })

    store.setIsExporting(true, 80)

    if (blob) {
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ])
      store.setIsExporting(true, 100)
      showToast.success('Code snap copied to clipboard!')
      return true
    }
    return false
  } catch (error) {
    console.error('Clipboard copy error:', error)
    showToast.error('Failed to copy. Try downloading the image instead.')
    return false
  } finally {
    // Restore cursor
    document.body.style.cursor = ''
    setTimeout(() => {
      useSnapStore.getState().setIsExporting(false, 0)
    }, 400)
  }
}

// Helper to trigger file download in browser
const downloadFile = (dataUrl: string, fileName: string) => {
  const link = document.createElement('a')
  link.download = fileName
  link.href = dataUrl
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

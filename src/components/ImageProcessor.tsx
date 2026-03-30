import React, { useState } from 'react';
import { Upload, X, Download, ShieldCheck, Trash2, Eraser, Video, Search, Filter, Info, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, translations } from '../translations';
import { cn } from '../lib/utils';
import ExifReader from 'exifreader';
import { toast, Toaster } from 'sonner';

interface MetadataItem {
  tag: string;
  value: string;
  group?: string;
  isAi?: boolean;
}

interface ProcessedImage {
  id: string;
  originalName: string;
  originalSize: number;
  previewUrl: string;
  dimensions?: { width: number; height: number };
  processedBlob?: Blob;
  processedUrl?: string;
  processedSize?: number;
  status: 'idle' | 'processing' | 'done' | 'error';
  metadata?: MetadataItem[];
  showDetails?: boolean;
}

interface ImageProcessorProps {
  lang: Language;
}

export const ImageProcessor: React.FC<ImageProcessorProps> = ({ lang }) => {
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [editingImage, setEditingImage] = useState<ProcessedImage | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const t = translations[lang];

  const readMetadata = async (file: File): Promise<MetadataItem[]> => {
    try {
      const tags = await ExifReader.load(file);
      const result: MetadataItem[] = [];
      const aiKeywords = /AI|Google|C2PA|Generative|trained|algorithmic|composite|synthetic/i;
      
      for (const [key, tag] of Object.entries(tags)) {
        if (tag && tag.description !== undefined) {
          const desc = String(tag.description);
          if (desc.length < 1000) { // Limit length to avoid UI issues
            const group = (tag as any).group || 'Other';
            const isAi = aiKeywords.test(key) || aiKeywords.test(desc);
            result.push({
              tag: key,
              value: desc,
              group,
              isAi
            });
          }
        }
      }
      return result;
    } catch (e) {
      console.error('Error reading metadata:', e);
      return [];
    }
  };

  const processImage = async (image: ProcessedImage, silent = false) => {
    setImages(prev => prev.map(img => img.id === image.id ? { ...img, status: 'processing' } : img));

    try {
      const img = new Image();
      img.src = image.previewUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      ctx.drawImage(img, 0, 0);
      
      const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.92));
      if (!blob) throw new Error('Could not create blob');

      const processedUrl = URL.createObjectURL(blob);
      setImages(prev => prev.map(img => img.id === image.id ? { 
        ...img, 
        status: 'done', 
        processedBlob: blob, 
        processedUrl,
        processedSize: blob.size,
        metadata: undefined,
        showDetails: false 
      } : img));
      if (!silent) toast.success(t.success);
    } catch (error) {
      console.error('Error processing image:', error);
      setImages(prev => prev.map(img => img.id === image.id ? { ...img, status: 'error' } : img));
      if (!silent) toast.error('Error processing image');
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    handleFiles(files);
  };

  const handleFiles = async (files: File[]) => {
    const newImages: ProcessedImage[] = await Promise.all(files.map(async file => {
      let metadata: MetadataItem[] = [];
      let dimensions: { width: number; height: number } | undefined;

      if (file.type.startsWith('image/')) {
        metadata = await readMetadata(file);
        
        // Get dimensions
        dimensions = await new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve({ width: img.width, height: img.height });
          img.onerror = () => resolve(undefined);
          img.src = URL.createObjectURL(file);
        });
      }
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        originalName: file.name,
        originalSize: file.size,
        previewUrl: URL.createObjectURL(file),
        dimensions,
        status: 'idle',
        metadata,
        showDetails: true // Show details by default for new images
      };
    }));

    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const img = prev.find(i => i.id === id);
      if (img?.previewUrl) URL.revokeObjectURL(img.previewUrl);
      if (img?.processedUrl) URL.revokeObjectURL(img.processedUrl);
      return prev.filter(i => i.id !== id);
    });
  };

  const downloadImage = (image: ProcessedImage) => {
    if (!image.processedUrl) return;
    const a = document.createElement('a');
    a.href = image.processedUrl;
    a.download = `purged_${image.originalName}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const toggleDetails = (id: string) => {
    setImages(prev => prev.map(img => img.id === id ? { ...img, showDetails: !img.showDetails } : img));
  };

  const clearAll = () => {
    images.forEach(img => {
      if (img.previewUrl) URL.revokeObjectURL(img.previewUrl);
      if (img.processedUrl) URL.revokeObjectURL(img.processedUrl);
    });
    setImages([]);
  };

  const processAll = async () => {
    const unprocessed = images.filter(img => img.status === 'idle');
    if (unprocessed.length === 0) return;
    
    const loadingToast = toast.loading(t.processing);
    
    for (const img of unprocessed) {
      await processImage(img, true);
    }
    
    toast.dismiss(loadingToast);
    toast.success(`${unprocessed.length}개의 이미지 처리가 완료되었습니다.`);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <Toaster position="top-center" richColors />
      
      {/* Dropzone */}
      <div 
        className="relative group cursor-pointer"
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(Array.from(e.dataTransfer.files) as File[]);
        }}
      >
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          onChange={onFileChange}
        />
        <div className={cn(
          "border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center gap-4 transition-all duration-300 min-h-[240px] relative",
          isDragging 
            ? "border-blue-500 bg-blue-100/50 scale-[1.01] shadow-lg shadow-blue-100" 
            : "border-blue-200 bg-blue-50/40 hover:border-blue-400 hover:bg-blue-50/60"
        )}>
          {images.length > 0 ? (
            <>
              <div className="absolute top-4 right-4 z-20 flex gap-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); processAll(); }}
                  disabled={!images.some(img => img.status === 'idle')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-xs hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-0 disabled:pointer-events-none shadow-lg shadow-blue-200"
                >
                  <Eraser className="w-3.5 h-3.5" />
                  메타데이터 삭제
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); clearAll(); }}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-red-500 border border-red-100 rounded-xl font-bold text-xs hover:bg-red-50 transition-all active:scale-95 shadow-sm"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  이미지 모두삭제
                </button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-3 w-full p-2 pt-10">
                {images.map(img => (
                  <div key={img.id} className="aspect-square rounded-xl overflow-hidden border border-blue-200 relative group/img shadow-sm bg-white">
                    {img.originalName.toLowerCase().match(/\.(mp4|mov|avi|mkv)$/) ? (
                      <div className="w-full h-full flex items-center justify-center text-blue-500">
                        <Video className="w-6 h-6" />
                      </div>
                    ) : (
                      <img src={img.previewUrl} className="w-full h-full object-cover" alt="" />
                    )}
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
                      className="absolute top-1 right-1 p-1.5 bg-white/95 rounded-full shadow-md hover:bg-red-50 transition-all active:scale-90 z-20 border border-red-50"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                    {img.status === 'done' && (
                      <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                        <ShieldCheck className="w-8 h-8 text-white drop-shadow-md" />
                      </div>
                    )}
                  </div>
                ))}
                <div className="aspect-square rounded-xl border-2 border-dashed border-blue-300 flex flex-col items-center justify-center text-blue-400 hover:bg-blue-100 transition-colors gap-1">
                  <Upload className="w-5 h-5" />
                  <span className="text-[10px] font-bold">ADD</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300",
                isDragging ? "bg-blue-500 text-white scale-110" : "bg-blue-100 text-blue-500 group-hover:scale-110"
              )}>
                <Upload className="w-8 h-8" />
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">{t.dropzone}</p>
                <p className="text-sm text-gray-500 mt-1">JPEG, PNG, WEBP, GIF, TIFF, BMP (Max 50MB)</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Privacy Note */}
      <div className="mt-6 flex items-start gap-3 p-4 bg-green-50 rounded-2xl border border-green-100">
        <ShieldCheck className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
        <p className="text-sm text-green-800 leading-relaxed">
          {t.privacyNote}
        </p>
      </div>

      {/* Image List */}
      <div className="mt-8 space-y-4">
        <AnimatePresence mode="popLayout">
          {images.map((img) => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className={cn(
                "bg-white border rounded-2xl overflow-hidden transition-all duration-300",
                img.status === 'done' ? "border-green-100 shadow-sm" : "border-gray-100 shadow-md"
              )}
            >
              <div className="p-4 flex items-center justify-between border-b border-gray-50 bg-gray-50/20">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    <img src={img.previewUrl} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 truncate max-w-[150px] sm:max-w-[300px]">{img.originalName}</h4>
                    <div className="flex flex-wrap gap-2 mt-0.5">
                      {img.dimensions && (
                        <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">{img.dimensions.width} × {img.dimensions.height}</span>
                      )}
                      {img.status === 'done' && (
                        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded flex items-center gap-1">
                          <ShieldCheck className="w-2.5 h-2.5" /> CLEANED
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => toggleDetails(img.id)}
                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Details"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                  
                  {img.status === 'idle' ? (
                    <button 
                      onClick={() => processImage(img)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg font-bold text-xs hover:bg-blue-700 transition-all active:scale-95 shadow-sm"
                    >
                      <Eraser className="w-3.5 h-3.5" />
                      삭제
                    </button>
                  ) : (
                    <>
                      {img.status === 'done' && (
                        <button
                          onClick={() => downloadImage(img)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-all shadow-sm active:scale-95"
                        >
                          <Download className="w-3.5 h-3.5" />
                          {t.download}
                        </button>
                      )}
                      <button 
                        onClick={() => removeImage(img.id)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Metadata Table */}
              {img.showDetails && <MetadataSection img={img} />}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
};

const MetadataSection: React.FC<{ img: ProcessedImage }> = ({ img }) => {
  const [search, setSearch] = useState('');
  const [filterAi, setFilterAi] = useState(false);

  const filteredMetadata = (img.metadata || []).filter(item => {
    const matchesSearch = item.tag.toLowerCase().includes(search.toLowerCase()) || 
                         item.value.toLowerCase().includes(search.toLowerCase());
    const matchesAi = filterAi ? item.isAi : true;
    return matchesSearch && matchesAi;
  });

  const copyMetadata = () => {
    const text = (img.metadata || []).map(item => `${item.tag}\t${item.value}`).join('\n');
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="p-4 sm:p-6">
      {img.status !== 'done' ? (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
            <div className="flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Metadata Analysis</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tags..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-7 pr-3 py-1 text-[10px] bg-gray-100 border-none rounded-lg focus:ring-1 focus:ring-blue-500 w-32 sm:w-48 transition-all"
                />
                <Search className="w-3 h-3 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2" />
              </div>
              
              <button
                onClick={() => setFilterAi(!filterAi)}
                className={cn(
                  "px-2 py-1 rounded-lg text-[9px] font-bold uppercase tracking-tight transition-all flex items-center gap-1",
                  filterAi 
                    ? "bg-blue-600 text-white shadow-sm" 
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                )}
              >
                <Filter className={cn("w-2.5 h-2.5", filterAi ? "text-white" : "text-gray-400")} />
                AI
              </button>

              <button 
                onClick={copyMetadata}
                className="flex items-center gap-1 text-[9px] font-bold text-gray-400 hover:text-blue-500 transition-colors uppercase"
              >
                <Copy className="w-2.5 h-2.5" />
                Copy
              </button>
            </div>
          </div>

          <div className="border border-gray-100 rounded-xl overflow-hidden bg-gray-50/20">
            <div className="max-h-[300px] overflow-y-auto">
              <table className="w-full text-left text-[10px] border-collapse">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-gray-100 text-gray-500 border-b border-gray-100">
                    <th className="px-4 py-2 font-bold uppercase tracking-wider w-1/4">Group</th>
                    <th className="px-4 py-2 font-bold uppercase tracking-wider w-1/4">Tag</th>
                    <th className="px-4 py-2 font-bold uppercase tracking-wider">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredMetadata.length > 0 ? (
                    filteredMetadata.map((item, idx) => (
                      <tr key={`${item.tag}-${idx}`} className={cn(
                        "transition-colors group",
                        item.isAi ? "bg-blue-50/50 hover:bg-blue-50" : "hover:bg-white"
                      )}>
                        <td className="px-4 py-2 text-[9px] font-bold text-gray-400 uppercase tracking-tight align-top">
                          {item.group}
                        </td>
                        <td className="px-4 py-2 font-semibold text-gray-600 align-top">
                          <div className="flex items-center gap-1.5">
                            {item.isAi && <div className="w-1 h-1 rounded-full bg-blue-500 shrink-0 animate-pulse" />}
                            {item.tag}
                          </div>
                        </td>
                        <td className={cn(
                          "px-4 py-2 break-all leading-relaxed font-mono",
                          item.isAi ? "text-blue-700 font-medium" : "text-gray-900"
                        )}>
                          {item.value}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-4 py-6 text-center text-gray-400 italic bg-white">
                        <div className="flex flex-col items-center gap-1">
                          <Info className="w-6 h-6 text-gray-200" />
                          <span>{search || filterAi ? 'No matching metadata found' : 'No metadata found'}</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-4 bg-green-50/30 rounded-xl border border-dashed border-green-100">
          <ShieldCheck className="w-10 h-10 text-green-500 mb-2 opacity-40" />
          <p className="text-xs font-bold text-green-700">All metadata successfully removed</p>
          <p className="text-[10px] text-green-600/70 mt-1">This image is now safe to share.</p>
        </div>
      )}
    </div>
  );
};


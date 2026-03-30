export type Language = 'ko' | 'en' | 'ja' | 'fr' | 'de' | 'zh';

export const languages: { code: Language; name: string; native: string }[] = [
  { code: 'ko', name: 'Korean', native: '한국어' },
  { code: 'en', name: 'English', native: 'English' },
  { code: 'ja', name: 'Japanese', native: '日本語' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'de', name: 'German', native: 'Deutsch' },
  { code: 'zh', name: 'Chinese', native: '中文' },
];

export const translations: Record<Language, any> = {
  en: {
    title: 'EXIF Purge',
    subtitle: 'Remove metadata from your images for privacy',
    dropzone: 'Click or drag images here to remove EXIF',
    processing: 'Processing...',
    downloadAll: 'Download All',
    clearAll: 'Clear All',
    privacyNote: 'Your images are processed locally in your browser and are never uploaded to any server.',
    removeExif: 'Remove EXIF',
    download: 'Download',
    success: 'EXIF data removed successfully!',
    whatIsMetadata: 'What is Metadata?',
    whatIsExif: 'What is EXIF?',
    metadataDesc: 'Metadata is "data about data." In photos, it includes information like when the photo was taken, camera settings, and even GPS location.',
    exifDesc: 'EXIF (Exchangeable Image File Format) is a specific type of metadata used for digital photos. It can reveal private information like your location or device details. This primarily applies to photo (JPEG, PNG, WEBP, GIF, TIFF, BMP) files.',
    actions: {
      delete: 'Delete All',
      edit: 'Edit Fields',
      remove: 'Remove Metadata',
      details: 'Show Details',
    },
    fields: {
      make: 'Camera Make',
      model: 'Camera Model',
      date: 'Date Taken',
      location: 'Location (GPS)',
      software: 'Software',
    },
    terms: {
      link: 'Terms and Privacy',
      title: 'Terms and Privacy',
      intro: 'The terms and rules under which EXIFPurge ("we", "us") provides services to you at EXIFPurge.',
      termsTitle: 'Terms',
      terms: [
        'Users are responsible for all liabilities arising from the use of this service.',
        'All processing takes place in the user\'s browser. Please refer to the privacy policy below.',
        'The EXIFPurge service can be used for any purpose, whether personal or commercial.',
        'We reserve the right to change or discontinue any service of EXIFPurge at any time.',
        'We reserve the right to change these terms without prior notice.',
        'This service is provided without any warranty.'
      ],
      privacyTitle: 'Privacy',
      privacy: [
        'Files do not leave your device. All processing is performed locally in the browser. No server-side processing is required at all.',
        'We cannot collect, store, or access any files you process using this service. This is technically impossible as your files are stored on your device.',
        'Google collects data and uses cookies for ad personalization and measurement purposes on this site. Learn more about how Google collects and uses data. You can opt out of ad personalization at any time in your Google Account settings. We also use cookies for statistical purposes. By using this site, you agree to our use of cookies.'
      ]
    }
  },
  ko: {
    title: 'EXIF 제거',
    subtitle: '개인 정보 보호를 위해 이미지에서 메타데이터를 제거하세요',
    dropzone: '이미지를 클릭하거나 여기로 드래그하여 EXIF를 제거하세요',
    processing: '처리 중...',
    downloadAll: '모두 다운로드',
    clearAll: '모두 지우기',
    privacyNote: '이미지는 브라우저에서 로컬로 처리되며 서버에 업로드되지 않습니다.',
    removeExif: 'EXIF 제거',
    download: '다운로드',
    success: 'EXIF 데이터가 성공적으로 제거되었습니다!',
    whatIsMetadata: '메타데이터란 무엇인가요?',
    whatIsExif: 'EXIF란 무엇인가요?',
    metadataDesc: '메타데이터는 "데이터에 관한 데이터"입니다. 사진의 경우 촬영 일시, 카메라 설정, 심지어 GPS 위치와 같은 정보를 포함합니다.',
    exifDesc: 'EXIF(Exchangeable Image File Format)는 디지털 사진에 사용되는 특정 유형의 메타데이터입니다. 위치 정보나 기기 상세 정보와 같은 개인 정보를 노출할 수 있습니다. 이는 주로 사진(JPEG, PNG, WEBP, GIF, TIFF, BMP) 파일에 적용됩니다.',
    actions: {
      delete: '전체 삭제',
      edit: '필드 수정',
      remove: '메타데이터 제거',
      details: '상세 정보 보기',
    },
    fields: {
      make: '카메라 제조사',
      model: '카메라 모델',
      date: '촬영 일시',
      location: '위치 (GPS)',
      software: '소프트웨어',
    },
    terms: {
      link: 'Terms and Privacy',
      title: 'Terms and Privacy',
      intro: 'EXIFPurge("당사", "저희")가 EXIFPurge에서 귀하에게 서비스를 제공하는 조건 및 규칙을 설명합니다.',
      termsTitle: 'Terms',
      terms: [
        '본서비스 이용에 따른 모든 책임은 사용자에게 있습니다.',
        '모든 처리는 사용자의 브라우저에서 이루어집니다. 아래 개인정보 보호 정책을 참조하십시오.',
        'EXIFPurge서비스는 개인적 목적이든 상업적 목적이든 어떤 용도로든 사용하실 수 있습니다.',
        '당사는 언제든지 EXIFPurge의 모든 서비스를 변경하거나 중단할 권리를 보유합니다.',
        '당사는 사전 통지 없이 본 조건을 변경할 권리를 보유합니다.',
        '본 서비스는 어떠한 보증도 제공하지 않습니다.'
      ],
      privacyTitle: 'Privacy',
      privacy: [
        '파일은 기기를 벗어나지 않습니다. 모든 처리는 브라우저에서 로컬로 수행됩니다. 서버 측 처리는 전혀 필요하지 않습니다.',
        '당사는 귀하가 이 서비스를 이용하여 처리하는 어떠한 파일도 수집, 저장하거나 접근할 수 없습니다. 귀하의 파일은 귀하의 기기에 저장되므로 기술적으로 이는 불가능합니다.',
        'Google은 이 사이트의 광고 개인화 및 측정 목적으로 데이터를 수집하고 쿠키를 사용합니다. Google의 데이터 수집 및 사용 방식에 대해 자세히 알아보세요. Google 계정 설정에서 언제든지 광고 개인화를 해제할 수 있습니다. 또한 통계 목적으로 쿠키를 사용합니다. 이 사이트를 이용함으로써 귀하는 당사의 쿠키 사용에 동의하는 것입니다.'
      ]
    }
  },
  ja: {
    title: 'EXIF 削除',
    subtitle: 'プライバシーのために画像からメタデータを削除します',
    dropzone: 'ここをクリックまたは画像をドラッグして EXIF を削除します',
    processing: '処理中...',
    downloadAll: 'すべてダウンロード',
    clearAll: 'すべてクリア',
    privacyNote: '画像はブラウザ内でローカルに処理され、サーバーにアップロードされることはありません。',
    removeExif: 'EXIF を削除',
    download: 'ダウンロード',
    success: 'EXIF データが正常に削除されました！',
    whatIsMetadata: 'メタデータとは何ですか？',
    whatIsExif: 'EXIFとは何ですか？',
    metadataDesc: 'メタデータは「データに関するデータ」です。写真の場合、撮影日時、カメラ設定、GPS位置情報などが含まれます。',
    exifDesc: 'EXIF（Exchangeable Image File Format）は、デジタル写真に使用される特定のメタデータ形式です。位置情報やデバイスの詳細などの個人情報が含まれることがあります。主に写真（JPEG, PNG, WEBP, GIF, TIFF, BMP）ファイルに適用されます。',
    actions: {
      delete: 'すべて削除',
      edit: 'フィールドを編集',
      remove: 'メタデータを削除',
      details: '詳細を表示',
    },
    fields: {
      make: 'カメラメーカー',
      model: 'カメラモデル',
      date: '撮影日',
      location: '位置情報 (GPS)',
      software: 'ソフトウェア',
    },
    terms: {
      link: 'Terms and Privacy',
      title: 'Terms and Privacy',
      intro: 'The terms and rules under which EXIFPurge ("we", "us") provides services to you at EXIFPurge.',
      termsTitle: 'Terms',
      terms: [
        'Users are responsible for all liabilities arising from the use of this service.',
        'All processing takes place in the user\'s browser. Please refer to the privacy policy below.',
        'The EXIFPurge service can be used for any purpose, whether personal or commercial.',
        'We reserve the right to change or discontinue any service of EXIFPurge at any time.',
        'We reserve the right to change these terms without prior notice.',
        'This service is provided without any warranty.'
      ],
      privacyTitle: 'Privacy',
      privacy: [
        'Files do not leave your device. All processing is performed locally in the browser. No server-side processing is required at all.',
        'We cannot collect, store, or access any files you process using this service. This is technically impossible as your files are stored on your device.',
        'Google collects data and uses cookies for ad personalization and measurement purposes on this site. Learn more about how Google collects and uses data. You can opt out of ad personalization at any time in your Google Account settings. We also use cookies for statistical purposes. By using this site, you agree to our use of cookies.'
      ]
    }
  },
  fr: {
    title: 'EXIF Purge',
    subtitle: 'Supprimez les métadonnées de vos images pour la confidentialité',
    dropzone: 'Cliquez ou faites glisser des images ici pour supprimer l\'EXIF',
    processing: 'Traitement...',
    downloadAll: 'Tout télécharger',
    clearAll: 'Tout effacer',
    privacyNote: 'Vos images sont traitées localement dans votre navigateur et ne sont jamais téléchargées sur un serveur.',
    removeExif: 'Supprimer l\'EXIF',
    download: 'Télécharger',
    success: 'Données EXIF supprimées avec succès !',
    whatIsMetadata: 'Qu\'est-ce que les métadonnées ?',
    whatIsExif: 'Qu\'est-ce que l\'EXIF ?',
    metadataDesc: 'Les métadonnées sont des "données sur les données". Dans les photos, elles incluent des informations telles que la date de prise de vue, les paramètres de l\'appareil photo et même la position GPS.',
    exifDesc: 'L\'EXIF (Exchangeable Image File Format) est un type spécifique de métadonnées utilisé pour les photos numériques. Il peut révéler des informations privées comme votre position ou les détails de votre appareil. Cela s\'applique principalement aux fichiers photo (JPEG, PNG, WEBP, GIF, TIFF, BMP).',
    actions: {
      delete: 'Tout supprimer',
      edit: 'Modifier les champs',
      remove: 'Supprimer les métadonnées',
      details: 'Afficher les détails',
    },
    fields: {
      make: 'Fabricant de l\'appareil',
      model: 'Modèle de l\'appareil',
      date: 'Date de prise de vue',
      location: 'Emplacement (GPS)',
      software: 'Logiciel',
    },
    terms: {
      link: 'Terms and Privacy',
      title: 'Terms and Privacy',
      intro: 'The terms and rules under which EXIFPurge ("we", "us") provides services to you at EXIFPurge.',
      termsTitle: 'Terms',
      terms: [
        'Users are responsible for all liabilities arising from the use of this service.',
        'All processing takes place in the user\'s browser. Please refer to the privacy policy below.',
        'The EXIFPurge service can be used for any purpose, whether personal or commercial.',
        'We reserve the right to change or discontinue any service of EXIFPurge at any time.',
        'We reserve the right to change these terms without prior notice.',
        'This service is provided without any warranty.'
      ],
      privacyTitle: 'Privacy',
      privacy: [
        'Files do not leave your device. All processing is performed locally in the browser. No server-side processing is required at all.',
        'We cannot collect, store, or access any files you process using this service. This is technically impossible as your files are stored on your device.',
        'Google collects data and uses cookies for ad personalization and measurement purposes on this site. Learn more about how Google collects and uses data. You can opt out of ad personalization at any time in your Google Account settings. We also use cookies for statistical purposes. By using this site, you agree to our use of cookies.'
      ]
    }
  },
  de: {
    title: 'EXIF Purge',
    subtitle: 'Metadaten aus Ihren Bildern für den Datenschutz entfernen',
    dropzone: 'Bilder hierher klicken oder ziehen, um EXIF zu entfernen',
    processing: 'Verarbeitung...',
    downloadAll: 'Alle herunterladen',
    clearAll: 'Alle löschen',
    privacyNote: 'Ihre Bilder werden lokal in Ihrem Browser verarbeitet und niemals auf einen Server hochgeladen.',
    removeExif: 'EXIF entfernen',
    download: 'Herunterladen',
    success: 'EXIF-Daten erfolgreich entfernt!',
    whatIsMetadata: 'Was sind Metadaten?',
    whatIsExif: 'Was ist EXIF?',
    metadataDesc: 'Metadaten sind „Daten über Daten“. Bei Fotos enthalten sie Informationen wie das Aufnahmedatum, Kameraeinstellungen und sogar den GPS-Standort.',
    exifDesc: 'EXIF (Exchangeable Image File Format) ist eine spezielle Art von Metadaten, die für Digitalfotos verwendet werden. Es kann private Informationen wie Ihren Standort oder Gerätedaten preisgeben. Dies gilt primär für Foto- (JPEG, PNG, WEBP, GIF, TIFF, BMP) Dateien.',
    actions: {
      delete: 'Alle löschen',
      edit: 'Felder bearbeiten',
      remove: 'Metadaten entfernen',
      details: 'Details anzeigen',
    },
    fields: {
      make: 'Kamerahersteller',
      model: 'Kameramodell',
      date: 'Aufnahmedatum',
      location: 'Standort (GPS)',
      software: 'Software',
    },
    terms: {
      link: 'Terms and Privacy',
      title: 'Terms and Privacy',
      intro: 'The terms and rules under which EXIFPurge ("we", "us") provides services to you at EXIFPurge.',
      termsTitle: 'Terms',
      terms: [
        'Users are responsible for all liabilities arising from the use of this service.',
        'All processing takes place in the user\'s browser. Please refer to the privacy policy below.',
        'The EXIFPurge service can be used for any purpose, whether personal or commercial.',
        'We reserve the right to change or discontinue any service of EXIFPurge at any time.',
        'We reserve the right to change these terms without prior notice.',
        'This service is provided without any warranty.'
      ],
      privacyTitle: 'Privacy',
      privacy: [
        'Files do not leave your device. All processing is performed locally in the browser. No server-side processing is required at all.',
        'We cannot collect, store, or access any files you process using this service. This is technically impossible as your files are stored on your device.',
        'Google collects data and uses cookies for ad personalization and measurement purposes on this site. Learn more about how Google collects and uses data. You can opt out of ad personalization at any time in your Google Account settings. We also use cookies for statistical purposes. By using this site, you agree to our use of cookies.'
      ]
    }
  },
  zh: {
    title: 'EXIF 清除',
    subtitle: '从您的图像中删除元数据以保护隐私',
    dropzone: '点击或拖动图像到此处以删除 EXIF',
    processing: '处理中...',
    downloadAll: '下载全部',
    clearAll: '清除全部',
    privacyNote: '您的图像在浏览器中本地处理，绝不会上传到任何服务器。',
    removeExif: '删除 EXIF',
    download: '下载',
    success: 'EXIF 数据已成功删除！',
    whatIsMetadata: '什么是元数据？',
    whatIsExif: '什么是 EXIF？',
    metadataDesc: '元数据是“关于数据的数据”。在照片中，它包括拍摄时间、相机设置甚至 GPS 位置等信息。',
    exifDesc: 'EXIF（可交换图像文件格式）是用于数字照片的一种特定类型的元数据。它可以泄露您的位置或设备详细信息等私人信息。这主要适用于照片（JPEG、PNG、WEBP、GIF、TIFF、BMP）文件。',
    actions: {
      delete: '全部删除',
      edit: '编辑字段',
      remove: '删除元数据',
      details: '显示详情',
    },
    fields: {
      make: '相机品牌',
      model: '相机型号',
      date: '拍摄日期',
      location: '位置 (GPS)',
      software: '软件',
    },
    terms: {
      link: 'Terms and Privacy',
      title: 'Terms and Privacy',
      intro: 'The terms and rules under which EXIFPurge ("we", "us") provides services to you at EXIFPurge.',
      termsTitle: 'Terms',
      terms: [
        'Users are responsible for all liabilities arising from the use of this service.',
        'All processing takes place in the user\'s browser. Please refer to the privacy policy below.',
        'The EXIFPurge service can be used for any purpose, whether personal or commercial.',
        'We reserve the right to change or discontinue any service of EXIFPurge at any time.',
        'We reserve the right to change these terms without prior notice.',
        'This service is provided without any warranty.'
      ],
      privacyTitle: 'Privacy',
      privacy: [
        'Files do not leave your device. All processing is performed locally in the browser. No server-side processing is required at all.',
        'We cannot collect, store, or access any files you process using this service. This is technically impossible as your files are stored on your device.',
        'Google collects data and uses cookies for ad personalization and measurement purposes on this site. Learn more about how Google collects and uses data. You can opt out of ad personalization at any time in your Google Account settings. We also use cookies for statistical purposes. By using this site, you agree to our use of cookies.'
      ]
    }
  },
};

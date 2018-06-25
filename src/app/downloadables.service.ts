export class DownloadService {
  dlPath: string = '/assets/downloadables/';
  
  getPrintDownloads() { return this.printDownloads; }
  getSocialDownloads() { return this.socialDownloads; }
  getPrintDownloadable(id: string, type: string) { 
    const downloadable = this.printDownloads.find((s) => {
      return s.id === id && s.type === type;
    });
    return downloadable;
  }
  getSocialDownloadable(id: string, type: string) { 
    const downloadable = this.socialDownloads.find((s) => {
      return s.id === id && s.type === type;
    });
    return downloadable;
  }
  buildPath(type) { return this.dlPath + type + '/'; }

  private printDownloads = [
    { id: '1', type: 'print', size: 'triple', tilePath: this.buildPath('tile'), tileName: 'SIGN_UP_POSTER_1.jpg', assetPath: this.buildPath('print'), assetName: 'SIGN_UP_POSTER_A3_1.pdf' },
    { id: '2', type: 'print', size: 'triple', tilePath: this.buildPath('tile'), tileName: 'SIGN_UP_POSTER_2.jpg', assetPath: this.buildPath('print'), assetName: 'SIGN_UP_POSTER_A3_2.pdf' },
    { id: '3', type: 'print', size: 'triple', tilePath: this.buildPath('tile'), tileName: 'SIGN_UP_POSTER_3.jpg', assetPath: this.buildPath('print'), assetName: 'SIGN_UP_POSTER_A3_3.pdf' }
  ];
  private socialDownloads = [
    { id: '1', type: 'social',size: 'triple', tilePath: this.buildPath('tile'), tileName: 'SADD_Social_Post_1.jpg', assetPath: this.buildPath('social'), assetName: 'SADD_Social_Post_Downloadable_1.png' },
    { id: '2', type: 'social',size: 'triple', tilePath: this.buildPath('tile'), tileName: 'SADD_Social_Post_2.jpg', assetPath: this.buildPath('social'), assetName: 'SADD_Social_Post_Downloadable_2.png' },
    { id: '3', type: 'social',size: 'triple', tilePath: this.buildPath('tile'), tileName: 'SADD_Social_Post_3.jpg', assetPath: this.buildPath('social'), assetName: 'SADD_Social_Post_Downloadable_3.png' },
    { id: '4', type: 'social',size: 'triple', tilePath: this.buildPath('tile'), tileName: 'SADD_Social_Post_4.jpg', assetPath: this.buildPath('social'), assetName: 'SADD_Social_Post_Downloadable_4.png' },
    { id: '3', type: 'social',size: 'custom1', tilePath: this.buildPath('tile'), tileName: 'SADD_Social_Post_5.jpg', assetPath: this.buildPath('social'), assetName: 'SADD-Stories_Window_1080x1920.mp4' },
    { id: '4', type: 'social',size: 'custom1', tilePath: this.buildPath('tile'), tileName: 'SADD_Social_Post_6.jpg', assetPath: this.buildPath('social'), assetName: 'SADD-Stories_Window_1080x1920.mp4' }
  ];
}
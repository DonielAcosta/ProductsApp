import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


export class CameraAdapter {
    static async takePicture(): Promise<string[]>{
        const response = await launchCamera({
            mediaType: 'photo',
            quality: 0.7,
            cameraType: 'back',
          });
          console.log('Camera response:', response);

        if(response.assets && response.assets[0].uri){
            return [response.assets[0].uri];
        }
        return[];
    }

    static async getPictureFromLibrary(): Promise<string[]>{
        const response = await launchImageLibrary({
            mediaType: 'photo',
            quality:0.7,
            selectionLimit:10,
        });

        if(response.assets && response.assets.length > 0 ){
            return response.assets
            .map(asset => asset.uri!);
            // .filter(asset =>asset !== undefined);
        }
        return[];
    }
}

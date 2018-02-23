// File created to only test type definitions.
// This is NOT a functional code.
import React from 'react';
import DeprecatedCamera, { RNCamera as Camera, FaceDetector, RNCameraProps as CameraProps } from 'react-native-camera';
import { Platform } from 'react-native';

const Constants = Camera.Constants;

const noop = () => {};

const NoopComponent: React.StatelessComponent = () => null;

function detectFaces() {
    FaceDetector.detectFacesAsync('URI', {
        detectLandmarks: FaceDetector.Constants.Landmarks.all,
        runClassifications: FaceDetector.Constants.Classifications["none"],
        mode: "accurate"
    });
}

class ComponentToTest extends React.Component {

    private cam: Camera | null = null;

    onBarcodeRead: CameraProps['onBarCodeRead'] = async (data, type) => {
        const { cam } = this;
        if (cam) {
            const takePictureResponse = await cam.takePictureAsync({
                base64: true,
                exif: false,
                quality: 0.5
            });

            const recordResponse = await cam.recordAsync({
                mute: true,
                quality: Constants.VideoQuality["2160p"], // Or just "2160p"
                maxDuration: 300,
                maxFileSize: 3000
            })
            cam.stopRecording();
            
            if (Platform.OS === 'android') {
                const ratios = await cam.getSupportedRatiosAsync();
            }
        }
    }

    onFacesDetected: CameraProps['onFacesDetected'] = ({ faces }) => {
        const {
            bottomMouthPosition, bounds, faceID, yawAngle,
            smilingProbability, rollAngle, rightMouthPosition,
            rightEyePosition, rightEyeOpenProbability, rightEarPosition,
            rightCheekPosition, noseBasePosition, mouthPosition,
            leftMouthPosition, leftEyePosition, leftEyeOpenProbability,
            leftEarPosition, leftCheekPosition
        } = faces[0];
    }

    onFaceDetectionError: CameraProps['onFaceDetectionError'] = ({ isOperational }) => {}

    render() {
        return (
            <Camera
                ref={(cam) => this.cam = cam}
                autoFocus={Constants.AutoFocus.on} // Or just "on"
                flashMode={Constants.FlashMode.off} // Or just "off"
                permissionDialogMessage="Some message"
                pendingAuthorizationView={<NoopComponent/>}
                notAuthorizedView={<NoopComponent/>}
                zoom={0.4}
                focusDepth={0.2}
                permissionDialogTitle="Some title"
                ratio={0.8}
                type={Constants.Type.front} // Or just "front"
                barCodeTypes={[
                    Constants.BarCodeType.aztec,
                    "datamatrix",
                    Constants.BarCodeType["interleaved2of5"]
                ]}
                captureAudio
                faceDetectionClassifications={Constants.FaceDetection.Classifications.all}
                faceDetectionLandmarks={Constants.FaceDetection.Landmarks.none}
                faceDetectionMode={Constants.FaceDetection.Mode.accurate}
                onCameraReady={noop}
                onMountError={noop}
                onFacesDetected={this.onFacesDetected}
                onFaceDetectionError={this.onFaceDetectionError}
                onBarCodeRead={this.onBarcodeRead}
            />
        );
    }

}
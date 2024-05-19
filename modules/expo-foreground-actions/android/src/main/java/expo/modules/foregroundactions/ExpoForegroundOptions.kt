package expo.modules.foregroundactions

import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

class ExpoForegroundOptions : Record {
    @Field
    val headlessTaskName: String = "default"

    @Field
    val notificationTitle: String = "Notification Title"

    @Field
    val notificationDesc: String = "Notification Description"

    @Field
    val notificationIconName: String = "ic_launcher"

    @Field
    val notificationIconType: String = "mipmap"

    @Field
    val linkingURI: String = ""
}

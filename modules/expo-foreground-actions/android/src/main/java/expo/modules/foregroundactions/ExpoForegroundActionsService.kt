package expo.modules.foregroundactions

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.IBinder
import androidx.core.app.NotificationCompat
import com.facebook.react.HeadlessJsTaskService
import com.facebook.react.bridge.Arguments
import com.facebook.react.jstasks.HeadlessJsTaskConfig


class ExpoForegroundActionsService : HeadlessJsTaskService() {
    companion object {
        private const val CHANNEL_ID = "ExpoForegroundActionChannel"

        fun buildNotification(
                context: Context,
                notificationTitle: String,
                notificationDesc: String,
                notificationIconInt: Int,
                linkingURI: String
        ): Notification {
            val notificationIntent: Intent = if (linkingURI.isNotEmpty()) {
                Intent(Intent.ACTION_VIEW, Uri.parse(linkingURI))
            } else {
                Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_LAUNCHER)
            }
            val contentIntent: PendingIntent = PendingIntent.getActivity(context, 0, notificationIntent, PendingIntent.FLAG_IMMUTABLE);
            val builder = NotificationCompat.Builder(context, CHANNEL_ID)
                    .setContentTitle(notificationTitle)
                    .setContentText(notificationDesc)
                    .setSmallIcon(notificationIconInt)
                    .setContentIntent(contentIntent)
                    .setOngoing(true)
                    .setSilent(true)
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                builder.setForegroundServiceBehavior(Notification.FOREGROUND_SERVICE_IMMEDIATE)
            }

            return builder.build()
        }
    }


    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val extras: Bundle? = intent?.extras
        requireNotNull(extras) { "Extras cannot be null" }

        val notificationTitle: String = extras.getString("notificationTitle")!!;
        val notificationDesc: String = extras.getString("notificationDesc")!!;
        val notificationIconInt: Int = extras.getInt("notificationIconInt");
        val notificationId: Int = extras.getInt("notificationId");
        val linkingURI: String = extras.getString("linkingURI")!!;


        createNotificationChannel() // Necessary creating channel for API 26+

        val notification: Notification = buildNotification(
                this,
                notificationTitle,
                notificationDesc,
                notificationIconInt,
                linkingURI
        )

        startForeground(notificationId, notification)

        return super.onStartCommand(intent, flags, startId)
    }

    override fun onBind(intent: Intent): IBinder? {
        return null
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val serviceChannel = NotificationChannel(CHANNEL_ID, "Foreground Service Channel",
                    NotificationManager.IMPORTANCE_DEFAULT)
            val manager = getSystemService(NotificationManager::class.java)
            manager!!.createNotificationChannel(serviceChannel)
        }
    }

    override fun getTaskConfig(intent: Intent): HeadlessJsTaskConfig? {
        return intent.extras?.let {
            HeadlessJsTaskConfig(
                    intent.extras?.getString("headlessTaskName")!!,
                    Arguments.fromBundle(it),
                    0, // timeout for the task
                    true // optional: defines whether or not the task is allowed in foreground.
                    // Default is false
            )
        }
    }
}

<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\URL;
use Illuminate\Notifications\Notification;

class CustomVerifyEmail extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable)
    {
        $user_id = $notifiable->user_id;
        $hash = $notifiable->email_verified_token;

        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            [
                'user_id' => $user_id,
                'hash' => $hash,
            ]
        );

        return (new MailMessage)
            ->subject('自定义主题')
            ->markdown('vendor.mail.custom_verify_email', ['actionUrl' => $verificationUrl]);
        // ->line('请点击下面的链接验证您的邮箱地址。')
        // ->action('验证邮箱', $verificationUrl)
        // ->line('感谢您使用我们的应用程序！');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}

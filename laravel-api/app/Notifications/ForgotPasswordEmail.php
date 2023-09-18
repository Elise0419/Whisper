<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\URL;

class ForgotPasswordEmail extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
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
    public function toMail(object $notifiable): MailMessage
    {
        $token = $notifiable->token;

        // 生成带签名的验证链接
        $verificationUrl = URL::temporarySignedRoute(
            'http://10.147.20.3/pwdreset/', // 路由的名称
            now()->addMinutes(15), // 链接的有效期
            [
                'token' => $token,
            ]
        );

        return (new MailMessage)
            ->line('請點擊連結完成密碼重置作業。')
            ->action('密碼重設', $verificationUrl)
            ->line('若不是您本人提出忘記密碼申請，請勿點擊連結');
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

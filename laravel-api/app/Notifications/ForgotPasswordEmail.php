<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Hash;

class ForgotPasswordEmail extends Notification
{
    use Queueable;
    protected $token;


    /**
     * Create a new notification instance.
     */
    public function __construct(string $token)
    {
        $this->token = $token;
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

        // $Route = URL::temporarySignedRoute(
        //     'password.reset',
        //     now()->addMinutes(15),
        //     [
        //         'token' => base64_encode($notifiable->token),
        //     ],
        // );

        // return (new MailMessage)
        //     ->line('請點擊連結完成密碼重置作業')
        //     ->action('密碼重設', 'http://localhost/password' . '/' . parse_url($Route, PHP_URL_QUERY))
        //     ->line('若不是您本人提出忘記密碼申請，請勿點擊連結');
        // $token = $notifiable->token;
        // $encodedToken = base64_encode($token);
        // $signatureUrl = URL::signedRoute('password.reset', ['token' => $encodedToken], now()->addMinutes(60));


        // return (new MailMessage)
        //     ->line('請點擊連結完成密碼重置作業')
        //     ->action('密碼重設', $signatureUrl)
        //     ->line('若不是您本人提出忘記密碼申請，請勿點擊連結');



        $token = $this->token;
        $encodedToken = base64_encode($token);
        $dataToSign = implode('|', ['token' => $token]);
        $signature = hash('sha256', $dataToSign);
        $exp = now()->addMinutes(15)->timestamp;


        $verificationUrl = url('http://localhost:3000/password/token=' . $encodedToken . '&expires=' . $exp . '&signature=' . $signature);
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

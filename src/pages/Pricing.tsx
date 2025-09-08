import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Sparkles, ArrowLeft, Star } from 'lucide-react';
import { createCheckoutSession } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

const PRICING_PLANS = [
  {
    id: 'free',
    name: 'مجاني',
    price: '0',
    period: 'دائماً',
    description: 'مثالي للبدء في إنشاء سيرتك الذاتية',
    features: [
      'إنشاء سيرة ذاتية واحدة',
      'نموذجين أساسيين',
      '5 استخدامات للذكاء الاصطناعي',
      'تصدير PDF مع علامة مائية',
      'دعم اللغة العربية',
    ],
    limitations: [
      'نماذج محدودة',
      'ميزات ذكاء اصطناعي محدودة',
      'علامة مائية على PDF',
    ],
    popular: false,
    buttonText: 'البدء مجاناً',
    buttonVariant: 'outline' as const,
  },
  {
    id: 'premium',
    name: 'مميز',
    price: '99',
    period: 'شهرياً',
    description: 'للمحترفين الذين يريدون الأفضل',
    features: [
      'سير ذاتية غير محدودة',
      'جميع النماذج المميزة',
      'ذكاء اصطناعي غير محدود',
      'تصدير PDF عالي الجودة',
      'تخصيص متقدم للنماذج',
      'تحليل وتحسين تلقائي',
      'دعم تقني مخصص',
      'تحديثات أسبوعية',
    ],
    limitations: [],
    popular: true,
    buttonText: 'ترقية للمميز',
    buttonVariant: 'default' as const,
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  const { user, loading, subscribed, subscriptionTier } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }
  }, [user, loading, navigate]);

  const handleSubscribe = async (planId: string) => {
    if (planId === 'free') {
      navigate('/dashboard');
      return;
    }

    if (!user) {
      navigate('/auth');
      return;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await createCheckoutSession(planId);
      
      if (error) {
        toast({
          title: "خطأ",
          description: "فشل في إنشاء جلسة الدفع",
          variant: "destructive",
        });
        return;
      }

      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "خطأ غير متوقع",
        description: "حدث خطأ أثناء إنشاء جلسة الدفع",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">باقات الاشتراك</h1>
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              العودة للوحة التحكم
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">
            اختر الباقة المناسبة لك
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            سواء كنت تبحث عن عمل أو تريد تحديث سيرتك الذاتية، لدينا الباقة المناسبة لاحتياجاتك
          </p>
          
          {subscribed && (
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary px-4 py-2 rounded-full">
              <Crown className="h-4 w-4" />
              <span className="font-medium">أنت مشترك حالياً في الباقة المميزة</span>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {PRICING_PLANS.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative transition-all hover:shadow-lg ${
                plan.popular 
                  ? 'ring-2 ring-primary shadow-lg scale-105' 
                  : ''
              } ${
                (subscribed && plan.id === 'premium') || (!subscribed && plan.id === 'free')
                  ? 'opacity-75'
                  : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    الأكثر شعبية
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl flex items-center justify-center gap-2">
                  {plan.id === 'premium' && <Crown className="h-5 w-5 text-primary" />}
                  {plan.name}
                </CardTitle>
                <div className="text-3xl font-bold text-primary">
                  {plan.price} درهم
                  <span className="text-lg font-normal text-muted-foreground">/{plan.period}</span>
                </div>
                <CardDescription className="text-base">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-600">✓ ما يشمله:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.limitations.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 text-orange-600">⚠ القيود:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <span className="w-4 h-4 text-orange-600 flex-shrink-0">•</span>
                          <span className="text-sm text-muted-foreground">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button
                  variant={plan.buttonVariant}
                  size="lg"
                  className="w-full"
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={
                    isLoading || 
                    (subscribed && plan.id === 'premium') || 
                    (!subscribed && plan.id === 'free')
                  }
                >
                  {plan.id === 'premium' && <Sparkles className="h-4 w-4 mr-2" />}
                  {(subscribed && plan.id === 'premium') 
                    ? 'الباقة الحالية' 
                    : (!subscribed && plan.id === 'free')
                    ? 'الباقة الحالية'
                    : isLoading 
                    ? 'جار التحميل...'
                    : plan.buttonText
                  }
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">أسئلة شائعة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">هل يمكنني تغيير الباقة لاحقاً؟</h4>
                <p className="text-muted-foreground">نعم، يمكنك الترقية أو التراجع في أي وقت من إعدادات حسابك.</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">ما هي طرق الدفع المقبولة؟</h4>
                <p className="text-muted-foreground">نقبل جميع البطاقات الائتمانية الرئيسية والتحويل البنكي.</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">هل هناك فترة تجريبية مجانية؟</h4>
                <p className="text-muted-foreground">الباقة المجانية تتيح لك تجربة الخدمة بميزات محدودة دون الحاجة لبطاقة ائتمان.</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">هل يمكنني إلغاء الاشتراك في أي وقت؟</h4>
                <p className="text-muted-foreground">نعم، يمكنك إلغاء اشتراكك في أي وقت ولن نخصم رسوماً إضافية.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
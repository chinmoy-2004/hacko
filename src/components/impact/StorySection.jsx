import React from 'react';
import { Card, CardContent } from './CustomCard';
import { Badge } from './CustomBadge';

const StorySection = () => {
  const stories = [
    {
      quote: "Since switching to Green Store's zero-plastic alternatives, our family has eliminated over 200 plastic items from our monthly shopping. It feels amazing to make a real difference!",
      author: "Sarah Chen",
      location: "Portland, OR",
      impact: "200+ plastic items eliminated monthly",
      category: "Family Impact"
    },
    {
      quote: "As a restaurant owner, partnering with Green Store for our sustainable packaging has helped us prevent over 5,000kg of plastic waste annually while delighting our eco-conscious customers.",
      author: "Marcus Rodriguez",
      location: "Austin, TX", 
      impact: "5,000kg plastic waste prevented",
      category: "Business Impact"
    },
    {
      quote: "Green Store's carbon offset program allowed our company to achieve carbon neutrality ahead of schedule. Their transparency and measurable results give us confidence in our sustainability goals.",
      author: "Dr. Emily Watson",
      location: "Seattle, WA",
      impact: "Carbon neutral certification achieved",
      category: "Corporate Impact"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-green-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-green-800 mb-6">
            Stories Behind the Numbers
          </h2>
          <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
            Real people, real impact. Discover how our community is creating positive environmental change.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 pt-6">
              <CardContent className="p-8">
                <div className="mb-6">
                  <Badge variant="outline" className="mb-4 border-green-800 text-green-800">
                    {story.category}
                  </Badge>
                  <blockquote className="font-sans text-gray-700 leading-relaxed text-lg mb-6">
                    "{story.quote}"
                  </blockquote>
                </div>
                
                <div className="border-t pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-sans font-semibold text-green-800 text-lg">
                        {story.author}
                      </div>
                      <div className="font-sans text-gray-600 text-sm">
                        {story.location}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-green-100 rounded-lg p-4">
                    <div className="font-sans text-sm font-medium text-green-700 uppercase tracking-wide mb-1">
                      Personal Impact
                    </div>
                    <div className="font-sans text-green-800 font-semibold">
                      {story.impact}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-green-800 mb-4">
              Join Our Impact Community
            </h3>
            <p className="font-sans text-gray-600 text-lg mb-6">
              Every purchase contributes to a cleaner, greener future. Together, we're proving that sustainable choices create lasting change.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-serif font-bold text-green-800 mb-2">50,000+</div>
                <div className="font-sans text-gray-600">Active Green Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-serif font-bold text-green-600 mb-2">1,200+</div>
                <div className="font-sans text-gray-600">Partner Businesses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-serif font-bold text-green-500 mb-2">95%</div>
                <div className="font-sans text-gray-600">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;